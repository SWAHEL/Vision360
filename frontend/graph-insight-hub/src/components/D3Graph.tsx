import * as d3 from "d3";
import { useEffect, useRef } from "react";
import type { GraphNode, GraphEdge } from "@/api/graph";

type Props = {
  data: { nodes: GraphNode[]; edges: GraphEdge[] };
  onSelectCompany?: (companyKey: string) => void;
  /** e.g. "companies/ARAVO" — pass from GraphPage when a company is selected */
  selectedId?: string;
  /** Global size multiplier for nodes/icons/forces. 1 = default */
  size?: number;
};

const colorByType = (t?: string) =>
  ({ companies: "#5cc8ff", people: "#83e377", phones: "#ffc857", addresses: "#ff8fab" }[t || ""] ||
    "#a5b4c8");

// base radii; we multiply by `size` at runtime
const baseRadiusByType = (t?: string) =>
  ({ companies: 16, people: 11, phones: 10, addresses: 10 }[t || ""] || 10);

const iconByType = (t?: string) =>
  ({ companies: "🏢", people: "👤", phones: "☎️", addresses: "📍" }[t || ""] || "•");

export default function D3Graph({ data, onSelectCompany, selectedId, size = 2 }: Props) {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = parseInt(getComputedStyle(svg.node()!).width);
    const height = parseInt(getComputedStyle(svg.node()!).height);

    // helpers that use size
    const radiusByType = (t?: string) => baseRadiusByType(t) * size;
    const linkDistance = 90 * size;
    const collidePadding = 8 * size;
    const chargeStrength = -220 * size;
    const labelYOffset = 13 * size;
    const strokeSelected = 2 * size;
    const strokeNormal = 1.2 * size;

    // --- tooltip container (absolute, inside the graph container)
    const container = svgRef.current!.parentElement!;
    const tooltip = d3
      .select(container)
      .append("div")
      .style("position", "absolute")
      .style("pointer-events", "none")
      .style("background", "rgba(9,12,24,0.92)")
      .style("color", "#e6eefc")
      .style("padding", "6px 8px")
      .style("border", "1px solid #2a3751")
      .style("borderRadius", "6px")
      .style("font", "12px system-ui, sans-serif")
      .style("opacity", "0");

    const showTip = (html: string, x: number, y: number) => {
      tooltip.html(html).style("left", `${x + 12}px`).style("top", `${y + 12}px`).style("opacity", "1");
    };
    const hideTip = () => tooltip.style("opacity", "0");

    // --- clone & dedupe nodes
    const nodeMap = new Map<string, GraphNode>();
    for (const n of data.nodes) {
      if (!n?.id) continue;
      nodeMap.set(n.id, { ...n });
    }
    const nodes: any[] = Array.from(nodeMap.values());

    // --- map edges to source/target and keep only valid ones
    const rawLinks = data.edges.map((e) => ({ ...e, source: e.from, target: e.to }));
    const validLinks = rawLinks.filter((l) => {
      const sOk = typeof l.source === "string" && nodeMap.has(l.source);
      const tOk = typeof l.target === "string" && nodeMap.has(l.target);
      return sOk && tOk;
    });

    // --- neighbor highlighting
    const selected = selectedId ?? null;
    const neighbor = new Set<string>();
    if (selected) {
      for (const e of validLinks) {
        if (e.source === selected) neighbor.add(String(e.target));
        if (e.target === selected) neighbor.add(String(e.source));
      }
      neighbor.add(selected);
    }

    if (nodes.length === 0) {
      svg
        .append("text")
        .attr("x", width / 2)
        .attr("y", height / 2)
        .attr("text-anchor", "middle")
        .attr("fill", "#9fb3d9")
        .text("No data");
      return () => tooltip.remove();
    }

    // --- edges (links)
    const link = svg
      .append("g")
      .selectAll("line")
      .data(validLinks)
      .enter()
      .append("line")
      .attr("stroke", (d: any) => {
        if (!selected) return "#7f8ba3";
        return d.source === selected || d.target === selected ? "#cfe6ff" : "#3b4969";
      })
      .attr(
        "stroke-opacity",
        (d: any) =>
          !selected
            ? 0.6
            : d.source === selected || d.target === selected
            ? 0.9
            : 0.2
      )
      .attr(
        "stroke-width",
        (d: any) =>
          !selected
            ? 1.2 * size
            : d.source === selected || d.target === selected
            ? 2.4 * size
            : 0.8 * size
      )
      .on("mouseover", (event: any, d: any) => {
        const html = `
          <div><b>${d.type}</b>${d.label ? ` — <span style="opacity:.9">${d.label}</span>` : ""}</div>
          <div style="opacity:.8">from: ${d.source.id || d.source}</div>
          <div style="opacity:.8">to: ${d.target.id || d.target}</div>
        `;
        showTip(html, event.offsetX, event.offsetY);
      })
      .on("mousemove", (event: any) => showTip(tooltip.html(), event.offsetX, event.offsetY))
      .on("mouseout", hideTip);

    // --- nodes as <g> groups: circle + icon text
    const nodesGroup = svg
      .append("g")
      .selectAll("g.node")
      .data(nodes)
      .enter()
      .append("g")
      .attr("class", "node")
      .style("cursor", (d: any) => (d.type === "companies" ? "pointer" : "default"))
      .call(
        d3
          .drag<SVGGElement, any>()
          .on("start", (event, d) => {
            if (!event.active) sim.alphaTarget(0.3).restart();
            (d as any).fx = (d as any).x;
            (d as any).fy = (d as any).y;
          })
          .on("drag", (event, d) => {
            (d as any).fx = event.x;
            (d as any).fy = event.y;
          })
          .on("end", (event, d) => {
            if (!event.active) sim.alphaTarget(0);
            (d as any).fx = null;
            (d as any).fy = null;
          })
      )
      .on("click", (_evt, d: any) => {
        const [collection, key] = String(d.id).split("/");
        if (collection === "companies" && onSelectCompany) onSelectCompany(key);
      })
      .on("mouseover", (event: any, d: any) => {
        const html = `
          <div><b>${d.label || d.key}</b></div>
          <div style="opacity:.8">${d.type}</div>
          <div style="opacity:.6">${d.id}</div>
        `;
        showTip(html, event.offsetX, event.offsetY);
      })
      .on("mousemove", (event: any) => showTip(tooltip.html(), event.offsetX, event.offsetY))
      .on("mouseout", hideTip);

    // circle
    nodesGroup
      .append("circle")
      .attr("r", (d: any) => radiusByType(d.type))
      .attr("fill", (d: any) => colorByType(d.type))
      .attr("stroke", (d: any) => (!selected || neighbor.has(d.id)) ? "#0b0f1e" : "#283249")
      .attr("stroke-width", (d: any) => (!selected || d.id === selected) ? strokeSelected : strokeNormal)
      .attr("opacity", (d: any) => (!selected || neighbor.has(d.id)) ? 1 : 0.3);

    // icon (emoji)
    nodesGroup
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "central")
      .attr("pointer-events", "none")
      .attr("font-size", (d: any) => Math.round(radiusByType(d.type) * 1.2))
      .attr("opacity", (d: any) => (!selected || neighbor.has(d.id)) ? 1 : 0.4)
      .text((d: any) => iconByType(d.type));

    // labels (node names) – displayed below the node
    const labels = svg
      .append("g")
      .selectAll("text.nlabel")
      .data(nodes)
      .enter()
      .append("text")
      .attr("class", "nlabel")
      .attr("fill", (d: any) => (!selected || neighbor.has(d.id)) ? "#d6e2ff" : "#7d8db2")
      .attr("font-size", 12 * size)
      .attr("text-anchor", "middle")
      .text((d: any) => d.label || d.key);

    // --- simulation
    const sim = d3
      .forceSimulation(nodes as any)
      .force(
        "link",
        d3
          .forceLink(validLinks as any)
          .id((d: any) => d.id)
          .distance(linkDistance)
          .strength(0.2)
      )
      .force("charge", d3.forceManyBody().strength(chargeStrength))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collide", d3.forceCollide().radius((d: any) => radiusByType(d.type) + collidePadding));

    sim.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      nodesGroup.attr("transform", (d: any) => `translate(${d.x},${d.y})`);

      labels
        .attr("x", (d: any) => d.x)
        .attr("y", (d: any) => d.y + radiusByType(d.type) + labelYOffset);
    });

    return () => {
      sim.stop();
      tooltip.remove();
    };
  }, [data, onSelectCompany, selectedId, size]);

  return <svg ref={svgRef} style={{ width: "100%", height: "100%" }} />;
}

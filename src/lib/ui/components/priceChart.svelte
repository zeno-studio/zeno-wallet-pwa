<script lang="ts">

  // 定义数据点类型
  interface DataPoint {
    date: string;
    price: number;
  }

  interface Point extends DataPoint {
    x: number;
    y: number;
  }

  // 模拟一年的数据
  const data = $state<DataPoint[]>(generateYearData());
  let selectedPoint = $state<Point | null>(null);

  // 生成模拟数据
  function generateYearData(): DataPoint[] {
    const data: DataPoint[] = [];
    const startDate = new Date('2024-01-01');
    let price = 100;
    for (let i = 0; i < 365; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      price += (Math.random() - 0.5) * 10;
      data.push({
        date: date.toISOString().split('T')[0],
        price: Math.max(50, Math.min(200, price)),
      });
    }
    return data;
  }

  // SVG viewBox 尺寸
  const viewBoxWidth = 800;
  const viewBoxHeight = 400;
  const padding = 50;

  // 计算价格范围
  const prices = $derived(data.map(d => d.price));
  const minPrice = $derived(Math.min(...prices));
  const maxPrice = $derived(Math.max(...prices));
  const priceRange = $derived(maxPrice - minPrice);

  // 计算数据点坐标
  const points = $derived<Point[]>(
    data.map((d, i) => {
      const x = padding + (i / (data.length - 1)) * (viewBoxWidth - 2 * padding);
      const y =
        viewBoxHeight - padding - ((d.price - minPrice) / priceRange) * (viewBoxHeight - 2 * padding);
      return { x, y, date: d.date, price: d.price };
    })
  );

  // 生成折线路径
  const pathData = $derived(
    points.reduce((d, p, i) => d + (i === 0 ? `M${p.x},${p.y}` : ` L${p.x},${p.y}`), '')
  );

  // 处理点击事件，找到最近的数据点
  function handleClick(event: MouseEvent): void {
    const svg = event.currentTarget as SVGSVGElement;
    const rect = svg.getBoundingClientRect();
    const clickX = (event.clientX - rect.left) * (viewBoxWidth / rect.width);

    // 找到最近的数据点
    let closestPoint = points[0];
    let minDistance = Math.abs(points[0].x - clickX);
    for (const point of points) {
      const distance = Math.abs(point.x - clickX);
      if (distance < minDistance) {
        minDistance = distance;
        closestPoint = point;
      }
    }
    selectedPoint = closestPoint;
  }
</script>

<div class="chart-container">
  <svg viewBox="0 0 {viewBoxWidth} {viewBoxHeight}" on:click={handleClick}>
    <!-- 绘制折线 -->
    <path d={pathData} stroke="blue" stroke-width="2" fill="none" />

    <!-- 绘制 X 轴 -->
    <line
      x1={padding}
      y1={viewBoxHeight - padding}
      x2={viewBoxWidth - padding}
      y2={viewBoxHeight - padding}
      stroke="black"
    />

    <!-- 绘制 Y 轴 -->
    <line x1={padding} y1={padding} x2={padding} y2={viewBoxHeight - padding} stroke="black" />

    <!-- Y 轴价格标签 -->
    {#each Array(6) as _, i}
      {@const price = minPrice + (i / 5) * priceRange}
      {@const y = viewBoxHeight - padding - (i / 5) * (viewBoxHeight - 2 * padding)}
      <text x={padding - 40} y={y + 5} font-size="12">{price.toFixed(2)}</text>
    {/each}

    <!-- X 轴日期标签 -->
    {#each Array(5) as _, i}
      {@const index = Math.floor((i / 4) * (data.length - 1))}
      {@const x = padding + (i / 4) * (viewBoxWidth - 2 * padding)}
      <text x={x - 30} y={viewBoxHeight - padding + 20} font-size="12">{data[index].date}</text>
    {/each}

    <!-- 绘制竖线 -->
    {#if selectedPoint}
      <line
        x1={selectedPoint.x}
        y1={padding}
        x2={selectedPoint.x}
        y2={viewBoxHeight - padding}
        stroke="red"
        stroke-width="2"
        stroke-dasharray="5,5"
      />
    {/if}
  </svg>

  <!-- 显示右侧详情 -->
  {#if selectedPoint}
    <div
      class="tooltip"
      style="left: {(selectedPoint.x * 100) / viewBoxWidth}%; top: {(selectedPoint.y * 100) / viewBoxHeight}%"
    >
      Date: {selectedPoint.date}<br />
      Price: {selectedPoint.price.toFixed(2)}
    </div>
  {/if}
</div>

<style>
  .chart-container {
    width: 100%;
    max-width: 800px;
    height: 400px;
    position: relative;
  }

  svg {
    width: 100%;
    height: 100%;
    cursor: crosshair;
  }

  .tooltip {
    position: absolute;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 8px;
    border-radius: 4px;
    font-size: 14px;
    transform: translate(10px, -50%); /* 右侧偏移 */
  }
</style>
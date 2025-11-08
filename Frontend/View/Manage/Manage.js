
// Cập nhật năm
document.getElementById("year").textContent = new Date().getFullYear();

// Chuyển tab sidebar
const menuItems = document.querySelectorAll("#adminMenu .list-group-item");
const sections = document.querySelectorAll(".content-section");

menuItems.forEach(item => {
  item.addEventListener("click", e => {
    e.preventDefault();

    menuItems.forEach(i => i.classList.remove("active"));
    item.classList.add("active");

    sections.forEach(sec => sec.classList.add("d-none"));
    const target = document.getElementById(item.dataset.target);
    if (target) target.classList.remove("d-none");

    // Khi click vào "Sản phẩm nổi bật" thì render chart
    if (item.dataset.target === "top_product") {
      renderTopProductChart();
    }
  });
});

// ====== ECHARTS - BIỂU ĐỒ SẢN PHẨM BÁN CHẠY ======
function renderTopProductChart() {
  const chartDom = document.getElementById('topProductChart');
  const myChart = echarts.init(chartDom);

  const option = {
    title: {
      text: 'Top sản phẩm bán chạy',
      left: 'center',
      textStyle: {
        color: '#000',
        fontSize: 16
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' }
    },
    xAxis: {
      type: 'category',
      data: ['Air Jordan 1', 'Nike AF1', 'Yeezy 350', 'Adidas Forum', 'Puma Suede'],
      axisLabel: { color: '#333' },
      axisLine: { lineStyle: { color: '#000' } }
    },
    yAxis: {
      type: 'value',
      axisLabel: { color: '#333' },
      axisLine: { lineStyle: { color: '#000' } },
      splitLine: { lineStyle: { color: '#ccc' } }
    },
    series: [{
      data: [120, 90, 75, 60, 45],
      type: 'bar',
      barWidth: '50%',
      itemStyle: {
        color: '#000',
        borderRadius: [6, 6, 0, 0]
      }
    }]
  };

  myChart.setOption(option);
  window.addEventListener('resize', () => myChart.resize());
}




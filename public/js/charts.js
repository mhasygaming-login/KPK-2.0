/**
 * charts.js - High-Tech Financial / Trading-Style Analytics Engine (KPK Theme)
 * Cyber-Trading & Financial Intelligence Terminal Visualizations
 * WCAG 2.1 AA / AAA Compliant
 */

let tradingChartInstance = null;
let barChartInstance = null;
let doughnutChartInstance = null;
let rawPelakuData = [];
let rawStatistikData = null;
let currentViewMode = 'overview'; // 'overview' | 'sector' | 'candlestick'
let currentTimeframe = 'all';     // '1m' | '6m' | '1y' | 'all'

async function initCharts() {
  try {
    const [pelakuRes, statistikRes] = await Promise.all([
      fetch('/data/pelaku.json'),
      fetch('/data/statistik.json')
    ]);

    rawPelakuData = await pelakuRes.json();
    rawStatistikData = await statistikRes.json();

    // Render Trading Platform Primary Chart if present
    if (document.getElementById('tradingChartCanvas')) {
      renderTradingChart('overview', 'all');
      setupTradingControls();
    }

    // Support standard standalone charts if canvas elements exist
    if (document.getElementById('barChartKasus')) {
      renderBarChart('all');
    }
    if (document.getElementById('doughnutChartSektor')) {
      renderDoughnutChart('all');
    }

    setupLegacyFilterButtons();
    initTickerStream();
  } catch (err) {
    console.error('Gagal memuat data grafik:', err);
  }
}

/**
 * Render High-Tech Trading View (TradingView / Bloomberg Terminal Style)
 */
function renderTradingChart(viewMode = 'overview', timeframe = 'all') {
  const canvas = document.getElementById('tradingChartCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  if (tradingChartInstance) {
    tradingChartInstance.destroy();
  }

  // Gradients for glowing neon cyber effect
  const cyanGradient = ctx.createLinearGradient(0, 0, 0, 400);
  cyanGradient.addColorStop(0, 'rgba(0, 240, 255, 0.45)');
  cyanGradient.addColorStop(0.7, 'rgba(0, 240, 255, 0.08)');
  cyanGradient.addColorStop(1, 'rgba(0, 240, 255, 0.0)');

  const crimsonGradient = ctx.createLinearGradient(0, 0, 0, 400);
  crimsonGradient.addColorStop(0, 'rgba(255, 26, 64, 0.5)');
  crimsonGradient.addColorStop(0.7, 'rgba(255, 26, 64, 0.08)');
  crimsonGradient.addColorStop(1, 'rgba(255, 26, 64, 0.0)');

  if (viewMode === 'overview') {
    let trenData = rawStatistikData?.tren_tahunan || [];
    if (timeframe === '1y') {
      trenData = trenData.slice(-2);
    } else if (timeframe === '6m' || timeframe === '1m') {
      trenData = trenData.slice(-1);
    }

    const labels = trenData.map(d => 'FY ' + d.tahun);
    const kerugianValues = trenData.map(d => +(d.nominal_miliar / 1000).toFixed(2));
    const asetValues = trenData.map(d => +(d.aset_disita_miliar / 1000).toFixed(2));

    tradingChartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Estimasi Beban Kerugian Negara (Triliun Rp)',
            data: kerugianValues,
            borderColor: '#FF1A40',
            backgroundColor: crimsonGradient,
            borderWidth: 2.5,
            tension: 0.35,
            fill: true,
            pointBackgroundColor: '#FF1A40',
            pointBorderColor: '#050811',
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverRadius: 8,
            pointHoverBackgroundColor: '#FFFFFF',
            pointHoverBorderColor: '#FF1A40',
          },
          {
            label: 'Aset Rampasan Pulih Disita (Triliun Rp)',
            data: asetValues,
            borderColor: '#00F0FF',
            backgroundColor: cyanGradient,
            borderWidth: 2.5,
            tension: 0.35,
            fill: true,
            pointBackgroundColor: '#00F0FF',
            pointBorderColor: '#050811',
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverRadius: 8,
            pointHoverBackgroundColor: '#FFFFFF',
            pointHoverBorderColor: '#00F0FF',
          }
        ]
      },
      options: getTradingOptions()
    });

  } else if (viewMode === 'sector') {
    const sektorData = rawStatistikData?.distribusi_sektor || [
      { sektor: 'Swasta', total_nominal: 378000000000000 },
      { sektor: 'BUMN', total_nominal: 16925000000000 },
      { sektor: 'Kementerian', total_nominal: 8190100000000 },
      { sektor: 'Pemerintah Daerah', total_nominal: 90000000000 }
    ];

    const labels = sektorData.map(s => s.sektor);
    const dataValues = sektorData.map(s => +(s.total_nominal / 1000000000000).toFixed(2));

    tradingChartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Total Kerugian Sektoral (Triliun Rp)',
          data: dataValues,
          backgroundColor: [
            'rgba(255, 26, 64, 0.85)',
            'rgba(0, 240, 255, 0.85)',
            'rgba(56, 189, 248, 0.85)',
            'rgba(245, 158, 11, 0.85)'
          ],
          borderColor: ['#FF1A40', '#00F0FF', '#38BDF8', '#F59E0B'],
          borderWidth: 2,
          borderRadius: 8,
          maxBarThickness: 52
        }]
      },
      options: getTradingOptions()
    });

  } else if (viewMode === 'candlestick') {
    let monthly = rawStatistikData?.fluktuasi_bulanan_2024 || [];
    if (timeframe === '1m') monthly = monthly.slice(-1);
    else if (timeframe === '6m') monthly = monthly.slice(-6);

    const labels = monthly.map(m => m.bulan.substring(0, 3).toUpperCase() + ' 24');
    const lossVals = monthly.map(m => m.kerugian_triliun);
    const recoveredVals = monthly.map(m => m.aset_disita_triliun);

    tradingChartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Kerugian Baru Teridentifikasi (Rp T)',
            data: lossVals,
            backgroundColor: monthly.map(m => m.kerugian_triliun > 20 ? 'rgba(255, 26, 64, 0.9)' : 'rgba(255, 68, 100, 0.75)'),
            borderColor: '#FF1A40',
            borderWidth: 1.5,
            borderRadius: 6,
          },
          {
            label: 'Aset Recovery Disita (Rp T)',
            data: recoveredVals,
            backgroundColor: 'rgba(0, 255, 136, 0.85)',
            borderColor: '#00FF88',
            borderWidth: 1.5,
            borderRadius: 6,
          }
        ]
      },
      options: getTradingOptions()
    });
  }
}

function getTradingOptions() {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: '#F8FAFC',
          font: { family: 'JetBrains Mono, monospace', size: 11, weight: 'bold' },
          boxWidth: 10,
          boxHeight: 10,
          padding: 16
        }
      },
      tooltip: {
        backgroundColor: 'rgba(5, 8, 17, 0.95)',
        borderColor: 'rgba(0, 240, 255, 0.4)',
        borderWidth: 1,
        titleColor: '#00F0FF',
        bodyColor: '#F8FAFC',
        titleFont: { family: 'Orbitron, sans-serif', size: 12, weight: 'bold' },
        bodyFont: { family: 'JetBrains Mono, monospace', size: 12 },
        padding: 12,
        cornerRadius: 8,
        callbacks: {
          label: (item) => ` ${item.dataset.label.split('(')[0]}: Rp ${item.formattedValue} Triliun`
        }
      }
    },
    scales: {
      x: {
        grid: { color: 'rgba(0, 240, 255, 0.08)' },
        ticks: { color: '#94A3B8', font: { family: 'JetBrains Mono, monospace', size: 11, weight: 'bold' } }
      },
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(0, 240, 255, 0.08)' },
        ticks: {
          color: '#94A3B8',
          font: { family: 'JetBrains Mono, monospace', size: 11 },
          callback: (val) => 'Rp ' + val + ' T'
        }
      }
    }
  };
}

/**
 * Setup Trading Terminal View and Timeframe Controls
 */
function setupTradingControls() {
  const viewBtns = document.querySelectorAll('.terminal-view-btn');
  viewBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      viewBtns.forEach(b => {
        b.classList.remove('active', 'bg-[#00F0FF]', 'text-[#050811]');
        b.classList.add('text-slate-400');
      });
      btn.classList.add('active', 'bg-[#00F0FF]', 'text-[#050811]');
      btn.classList.remove('text-slate-400');
      currentViewMode = btn.getAttribute('data-view') || 'overview';
      renderTradingChart(currentViewMode, currentTimeframe);
    });
  });

  const tfBtns = document.querySelectorAll('.terminal-tf-btn');
  tfBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tfBtns.forEach(b => {
        b.classList.remove('active', 'bg-[#00F0FF]', 'text-[#050811]');
        b.classList.add('text-slate-400');
      });
      btn.classList.add('active', 'bg-[#00F0FF]', 'text-[#050811]');
      btn.classList.remove('text-slate-400');
      currentTimeframe = btn.getAttribute('data-tf') || 'all';
      renderTradingChart(currentViewMode, currentTimeframe);
    });
  });
}

/**
 * Standard Legacy Bar Chart Support
 */
function renderBarChart(year = 'all') {
  const ctx = document.getElementById('barChartKasus');
  if (!ctx) return;

  let filtered = [...rawPelakuData];
  if (year !== 'all') {
    filtered = filtered.filter(p => p.tahun_penindakan === parseInt(year));
  }

  filtered.sort((a, b) => b.nominal_kerugian - a.nominal_kerugian);
  const top10 = filtered.slice(0, 10);
  const labels = top10.map(p => p.nama.length > 18 ? p.nama.substring(0, 18) + '...' : p.nama);
  const dataValues = top10.map(p => +(p.nominal_kerugian / 1000000000000).toFixed(2));

  if (barChartInstance) barChartInstance.destroy();

  barChartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Estimasi Kerugian (Triliun Rupiah)',
        data: dataValues,
        backgroundColor: '#FF1A40',
        hoverBackgroundColor: '#ff3355',
        borderRadius: 6,
        maxBarThickness: 44
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          labels: { color: '#F8FAFC', font: { family: 'JetBrains Mono, monospace', size: 11, weight: 'bold' } }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: { color: 'rgba(0, 240, 255, 0.08)' },
          ticks: { color: '#94A3B8', font: { family: 'JetBrains Mono, monospace', size: 11 }, callback: (v) => 'Rp ' + v + ' T' }
        },
        x: {
          grid: { display: false },
          ticks: { color: '#94A3B8', font: { family: 'JetBrains Mono, monospace', size: 10 }, maxRotation: 45, minRotation: 20 }
        }
      }
    }
  });
}

/**
 * Standard Legacy Doughnut Chart Support
 */
function renderDoughnutChart(year = 'all') {
  const ctx = document.getElementById('doughnutChartSektor');
  if (!ctx) return;

  let filtered = [...rawPelakuData];
  if (year !== 'all') {
    filtered = filtered.filter(p => p.tahun_penindakan === parseInt(year));
  }

  const sektorAgg = { 'Swasta': 0, 'BUMN': 0, 'Kementerian': 0, 'Pemerintah Daerah': 0 };
  filtered.forEach(p => {
    if (sektorAgg[p.instansi] !== undefined) sektorAgg[p.instansi] += p.nominal_kerugian;
    else sektorAgg['Swasta'] += p.nominal_kerugian;
  });

  const sectors = Object.keys(sektorAgg);
  const rawValues = sectors.map(s => +(sektorAgg[s] / 1000000000000).toFixed(2));
  const colors = ['#FF1A40', '#00F0FF', '#38BDF8', '#F59E0B'];

  if (doughnutChartInstance) doughnutChartInstance.destroy();

  doughnutChartInstance = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: sectors,
      datasets: [{
        data: rawValues,
        backgroundColor: colors,
        borderWidth: 2,
        borderColor: '#050811',
        hoverOffset: 8
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '62%',
      plugins: {
        legend: {
          position: 'bottom',
          labels: { color: '#F8FAFC', font: { family: 'JetBrains Mono, monospace', size: 11, weight: 'bold' } }
        },
        tooltip: {
          backgroundColor: 'rgba(5, 8, 17, 0.95)',
          titleFont: { family: 'Orbitron, sans-serif' },
          bodyFont: { family: 'JetBrains Mono, monospace' },
          callbacks: { label: (item) => ` Total: Rp ${item.raw} Triliun` }
        }
      }
    }
  });
}

function setupLegacyFilterButtons() {
  const buttons = document.querySelectorAll('.year-filter-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => {
        b.classList.remove('active', 'bg-[#00F0FF]', 'text-[#050811]');
        b.classList.add('bg-[#090D16]', 'text-slate-400');
      });
      btn.classList.add('active', 'bg-[#00F0FF]', 'text-[#050811]');
      btn.classList.remove('bg-[#090D16]', 'text-slate-400');

      const yr = btn.getAttribute('data-year') || 'all';
      renderBarChart(yr);
      renderDoughnutChart(yr);
    });
  });
}

function initTickerStream() {
  const feedContainer = document.getElementById('liveAuditFeedList');
  if (!feedContainer || !rawStatistikData?.live_audit_feed) return;

  feedContainer.innerHTML = rawStatistikData.live_audit_feed.map(item => `
    <div class="flex items-center justify-between text-xs py-2 border-b border-slate-800/80 font-mono">
      <div class="flex items-center gap-2">
        <span class="text-[#00F0FF] font-bold">${item.time}</span>
        <span class="text-white font-semibold">${item.action}</span>
        <span class="text-slate-400 text-[11px] truncate max-w-[140px]">${item.target}</span>
      </div>
      <div class="flex items-center gap-2 shrink-0">
        <span class="text-[#00FF88] font-bold">${item.nominal}</span>
        <span class="px-1.5 py-0.5 rounded bg-[#00FF88]/15 text-[#00FF88] text-[10px] border border-[#00FF88]/30 font-bold">${item.status}</span>
      </div>
    </div>
  `).join('');
}

document.addEventListener('DOMContentLoaded', initCharts);

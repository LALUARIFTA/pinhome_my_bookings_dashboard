/* ============================================================
   PinHome Dashboard - Application Logic
   ============================================================ */

// Current Active Navigation State
let currentNav = 'Bookings';
let currentPeriodIndex = 0;
let activeDayIndex = 8;
let chartFilterMode = 'all';
let showAllBookingsFlag = false;
let currentBookingsSubTab = 'All';
let currentAptFilter = 'All';
let autopilotEnabled = true;

/* ==================== SIDEBAR ICONS ==================== */

function getNavIconSVG(name, isActive) {
  const primaryStroke = isActive ? '#29a399' : '#fae06c';
  const secondaryStroke = isActive ? '#1e2538' : '#ffffff';

  switch (name) {
    case 'Home':
      return `
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="${primaryStroke}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 4C9.5 4 7.7 5.8 7.5 8.2C5.5 8.6 4 10.4 4 12.5C4 14.9 6 17 8.5 17H15.5C18 17 20 14.9 20 12.5C20 10.4 18.5 8.6 16.5 8.2C16.3 5.8 14.5 4 12 4Z"/>
          <circle cx="12" cy="12" r="2.2" stroke="${secondaryStroke}" stroke-width="1.8"/>
        </svg>`;
    case 'Rate plans':
      return `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="${primaryStroke}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="4" y="10" width="3.5" height="10" rx="1"/>
          <rect x="10.25" y="13" width="3.5" height="7" rx="1" stroke="${secondaryStroke}"/>
          <rect x="16.5" y="5" width="3.5" height="15" rx="1"/>
        </svg>`;
    case 'Bookings':
      return `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="${primaryStroke}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="4" width="18" height="17" rx="3"/>
          <line x1="16" y1="2" x2="16" y2="6"/>
          <line x1="8" y1="2" x2="8" y2="6"/>
          <line x1="3" y1="9.5" x2="21" y2="9.5"/>
          <circle cx="8.5" cy="14" r="1" fill="${primaryStroke}"/>
          <circle cx="12" cy="14" r="1" fill="${primaryStroke}"/>
          <circle cx="15.5" cy="14" r="1" fill="${primaryStroke}"/>
        </svg>`;
    case 'Apartments':
      return `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="${primaryStroke}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 10.5L12 3L21 10.5V20C21 20.55 20.55 21 20 21H4C3.45 21 3 20.55 3 20V10.5Z"/>
          <path d="M9.5 21V14H14.5V21" stroke="${secondaryStroke}"/>
        </svg>`;
    case 'Pricing':
      return `
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="${primaryStroke}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="12 2 14.8 4.8 18.8 4.2 19.5 8.1 22.8 10.3 21.1 14 22.2 17.8 18.4 19.2 16.9 22.9 13.1 21.5 9.8 23.5 7.7 20.1 3.8 19.8 4.2 15.8 1.4 12.9 3.8 9.7 2.8 5.9 6.7 4.8 8.8 1.4 12 2"/>
          <line x1="9" y1="15" x2="15" y2="9" stroke="${secondaryStroke}"/>
          <circle cx="9.5" cy="9.5" r="1" fill="${secondaryStroke}"/>
          <circle cx="14.5" cy="14.5" r="1" fill="${secondaryStroke}"/>
        </svg>`;
    case 'Support':
      return `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="${primaryStroke}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 11.5C21 16.19 16.97 20 12 20C10.62 20 9.31 19.71 8.13 19.18L3 20.5L4.53 16.12C3.57 14.79 3 13.21 3 11.5C3 6.81 7.03 3 12 3C16.97 3 21 6.81 21 11.5Z"/>
          <line x1="9" y1="10.5" x2="15" y2="10.5" stroke="${secondaryStroke}"/>
          <line x1="9" y1="13.5" x2="13" y2="13.5" stroke="${secondaryStroke}"/>
        </svg>`;
    case 'LogOut':
      return `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="${primaryStroke}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M14 4H18C19.1 4 20 4.9 20 6V18C20 19.1 19.1 20 18 20H14"/>
          <polyline points="9 16 13 12 9 8" stroke="${secondaryStroke}"/>
          <line x1="3" y1="12" x2="13" y2="12" stroke="${secondaryStroke}"/>
        </svg>`;
    default:
      return '';
  }
}

function renderSidebarIcons() {
  const buttons = document.querySelectorAll('#sidebarNav .nav-item[data-nav]');
  buttons.forEach((btn) => {
    const name = btn.getAttribute('data-nav');
    const isActive = name === currentNav;
    const iconSpan = btn.querySelector('.nav-icon');
    if (iconSpan) {
      iconSpan.innerHTML = getNavIconSVG(name, isActive);
    }
  });
}

// Move the fluid sliding white pill (#active-nav-pill) to match the active button
function updateSlidingPillPosition() {
  const activeBtn = document.querySelector(`#sidebarNav .nav-item[data-nav="${currentNav}"]`);
  const pill = document.getElementById('active-nav-pill');
  if (!activeBtn || !pill) return;

  pill.style.top = `${activeBtn.offsetTop}px`;
  pill.style.height = `${activeBtn.offsetHeight}px`;
}

/* ==================== NAVIGATION & VIEWS ==================== */

function switchNav(targetNav) {
  if (targetNav === 'LogOut') {
    openLogoutModal();
    return;
  }

  const previousView = document.getElementById(`view-${currentNav}`);
  const nextView = document.getElementById(`view-${targetNav}`);
  if (!nextView) return;

  currentNav = targetNav;

  // Update sidebar active state & glide the inverted-curve pill
  const navButtons = document.querySelectorAll('#sidebarNav .nav-item[data-nav]');
  navButtons.forEach((btn) => {
    const isMatch = btn.getAttribute('data-nav') === targetNav;
    btn.classList.toggle('active', isMatch);
  });
  renderSidebarIcons();
  updateSlidingPillPosition();

  // Update search input placeholder contextually
  const searchInput = document.getElementById('searchInput');
  searchInput.placeholder = NAV_PLACEHOLDERS[targetNav] || 'Search...';

  // Animate outgoing view and incoming view
  if (previousView && previousView !== nextView) {
    previousView.classList.add('view-exiting');
    setTimeout(() => {
      previousView.classList.remove('view-visible', 'view-exiting');
      activateIncomingView(nextView, targetNav);
    }, 170);
  } else {
    activateIncomingView(nextView, targetNav);
  }
}

function activateIncomingView(nextView, targetNav) {
  const scrollContainer = document.getElementById('view-scroll-container');
  if (scrollContainer) {
    scrollContainer.scrollTop = 0;
  }

  // Retrigger staggered child entrance animations
  const staggerItems = nextView.querySelectorAll('.stagger-item');
  staggerItems.forEach((el, idx) => {
    el.style.animation = 'none';
    el.offsetHeight; // force reflow
    el.style.animation = `viewStaggerIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) ${idx * 0.055}s forwards`;
  });

  nextView.classList.add('view-visible');

  if (targetNav === 'Bookings') {
    renderChart(true);
  } else if (targetNav === 'Pricing') {
    updatePricingSimulator();
  }

  setTimeout(() => {
    if (scrollContainer) handleViewportScroll(scrollContainer);
  }, 80);
}

// Update top and bottom scroll fade shadows based on scroll position
function handleViewportScroll(container) {
  if (!container) return;
  const topShadow = document.getElementById('scrollShadowTop');
  const bottomShadow = document.getElementById('scrollShadowBottom');
  if (!topShadow || !bottomShadow) return;

  const scrollTop = container.scrollTop;
  const maxScroll = container.scrollHeight - container.clientHeight;

  topShadow.style.opacity = scrollTop > 8 ? '1' : '0';
  bottomShadow.style.opacity = maxScroll > 10 && scrollTop < maxScroll - 8 ? '1' : '0';
}

/* ==================== CHART ==================== */

function renderChart(animateFromZero = false) {
  const container = document.getElementById('barsContainer');
  if (!container) return;
  const data = periodDatasets[currentPeriodIndex];
  const maxVal = 3000;

  const todayIdx = data.findIndex((d) => d.type === 'today');
  if (animateFromZero && todayIdx !== -1) {
    activeDayIndex = todayIdx;
  }

  container.innerHTML = '';
  container.style.gridTemplateColumns = 'repeat(14, minmax(0, 1fr))';

  data.forEach((item, idx) => {
    const heightPct = Math.min(100, Math.round((item.value / maxVal) * 100));
    const isSelected = idx === activeDayIndex;

    let barColorClass = 'bg-[#dcf5fb] hover:bg-[#bcebf7]';
    if (isSelected) {
      barColorClass = 'bg-[#fae06c] hover:bg-[#f5d442]';
    } else if (item.type === 'highlight-cyan') {
      barColorClass = 'bg-[#aee8f7] hover:bg-[#95dff3]';
    }

    let opacityClass = 'opacity-100';
    if (chartFilterMode === 'today' && !isSelected) opacityClass = 'opacity-30';
    if (chartFilterMode === 'earned' && isSelected) opacityClass = 'opacity-30';

    const col = document.createElement('div');
    col.className = `chart-col flex flex-col items-center justify-end h-full cursor-pointer select-none group ${opacityClass}`;
    col.onclick = () => selectChartBar(idx);
    col.onmouseenter = () => updateTooltipPosition(idx);
    col.onmouseleave = () => updateTooltipPosition(activeDayIndex);

    const initialHeight = animateFromZero ? '0%' : `${heightPct}%`;

    col.innerHTML = `
      <div class="w-full flex-1 flex items-end justify-center pb-3">
        <div
          id="barFill-${idx}"
          class="chart-bar-fill w-full max-w-[20px] sm:max-w-[23px] rounded-[7px] ${barColorClass}"
          style="height: ${initialHeight};"
        ></div>
      </div>
      <span
        id="barLabel-${idx}"
        class="text-[12px] transition-colors duration-200 ${isSelected ? 'font-extrabold text-[#1e2538]' : 'font-medium text-[#9ba3b5] group-hover:text-[#1e2538]'}"
      >${item.day}</span>
    `;

    container.appendChild(col);

    if (animateFromZero) {
      setTimeout(() => {
        const fillEl = document.getElementById(`barFill-${idx}`);
        if (fillEl) fillEl.style.height = `${heightPct}%`;
      }, 35 + idx * 28);
    }
  });

  setTimeout(() => {
    updateTooltipPosition(activeDayIndex);
  }, animateFromZero ? 110 : 10);
}

function updateTooltipPosition(idx) {
  const data = periodDatasets[currentPeriodIndex];
  const item = data[idx];
  if (!item) return;

  const tooltip = document.getElementById('chartTooltip');
  const amountEl = document.getElementById('tooltipAmount');
  const subEl = document.getElementById('tooltipSub');
  const barFill = document.getElementById(`barFill-${idx}`);
  const plotArea = document.getElementById('chartPlotArea');

  if (!barFill || !plotArea || !tooltip) return;

  const plotRect = plotArea.getBoundingClientRect();
  const barRect = barFill.getBoundingClientRect();
  if (plotRect.width === 0) return;

  const centerX = barRect.left - plotRect.left + barRect.width / 2;
  const clampedX = Math.max(58, Math.min(plotRect.width - 58, centerX));

  const maxVal = 3000;
  const heightPct = Math.min(100, (item.value / maxVal) * 100);
  const plotHeight = plotRect.height - 34;
  const barTopPx = (heightPct / 100) * plotHeight + 38;

  tooltip.style.left = `${clampedX}px`;
  tooltip.style.bottom = `${barTopPx}px`;

  amountEl.textContent = `$${item.value.toFixed(2)}`;
  subEl.textContent = idx === activeDayIndex ? 'Total per day' : `Day ${item.day} earned`;
}

function selectChartBar(idx) {
  activeDayIndex = idx;
  renderChart(false);
}

function togglePeriodDropdown() {
  const dd = document.getElementById('periodDropdown');
  const chev = document.getElementById('periodChevron');
  dd.classList.toggle('hidden');
  chev.style.transform = dd.classList.contains('hidden') ? 'rotate(0deg)' : 'rotate(180deg)';
}

function selectPeriod(index, label) {
  currentPeriodIndex = index;
  document.getElementById('currentPeriodLabel').textContent = label;
  [0, 1, 2].forEach((i) => {
    const check = document.getElementById(`periodCheck${i}`);
    if (check) check.classList.toggle('hidden', i !== index);
  });
  togglePeriodDropdown();
  renderChart(true);
  showToast(`Updated chart period: ${label}`);
}

function filterChartHighlight(mode) {
  chartFilterMode = chartFilterMode === mode ? 'all' : mode;
  renderChart(false);
}

/* ==================== BOOKINGS ==================== */

function filterBookingsSubTab(tab) {
  currentBookingsSubTab = tab;
  document.querySelectorAll('.bsub-btn').forEach((btn) => {
    const isMatch = btn.getAttribute('data-bsub') === tab;
    btn.className = isMatch
      ? 'bsub-btn bg-white text-[#1e2538] px-2.5 py-1 rounded-full shadow-2xs transition'
      : 'bsub-btn text-[#9ba3b5] hover:text-[#1e2538] px-2.5 py-1 rounded-full transition';
  });
  renderBookings(document.getElementById('searchInput').value);
}

function renderBookings(searchTerm = '') {
  const listEl = document.getElementById('bookingsList');
  if (!listEl) return;
  const normalizedQuery = searchTerm.trim().toLowerCase();

  const filtered = bookingsData.filter((item) => {
    if (currentBookingsSubTab !== 'All' && item.status !== currentBookingsSubTab) return false;
    if (!showAllBookingsFlag && item.extra && !normalizedQuery && currentBookingsSubTab === 'All') return false;
    if (!normalizedQuery) return true;
    return (
      item.title.toLowerCase().includes(normalizedQuery) ||
      item.status.toLowerCase().includes(normalizedQuery) ||
      item.price.toLowerCase().includes(normalizedQuery)
    );
  });

  if (filtered.length === 0) {
    listEl.innerHTML = `<div class="py-8 text-center text-xs text-greyMuted">No bookings matching "<span class="font-bold text-navyText">${escapeHTML(searchTerm)}</span>".</div>`;
    return;
  }

  listEl.innerHTML = filtered.map((item) => {
    const isApproved = item.status === 'Approved';
    const badgeClasses = isApproved
      ? 'bg-[#def4f0] text-[#29a399]'
      : 'bg-[#fef8df] text-[#dfba2b]';

    return `
      <div class="booking-row py-3.5 px-2 -mx-2 rounded-2xl flex items-center justify-between gap-3">
        <div class="flex items-center gap-3.5 min-w-[175px] sm:min-w-[205px]">
          ${getPropertyBadgeSVG(item.badgeType)}
          <div>
            <h4 class="text-[13.5px] font-bold text-[#1e2538] leading-snug">${escapeHTML(item.title)}</h4>
            <p class="text-[11.5px] font-medium text-[#9ba3b5] mt-0.5">${escapeHTML(item.nights)}</p>
          </div>
        </div>

        <div class="hidden sm:flex items-center justify-center">
          <img
            src="${item.avatar}"
            onerror="this.src='https://placehold.co/60x60/29a399/ffffff?text=G'"
            alt="Guest"
            class="w-7 h-7 rounded-full object-cover ring-2 ring-slate-100"
          />
        </div>

        <div>
          <button
            onclick="toggleBookingStatus(${item.id})"
            title="Click to toggle status"
            class="px-3.5 py-1.5 rounded-lg text-[11.5px] font-bold transition-transform active:scale-95 ${badgeClasses}"
          >
            ${item.status}
          </button>
        </div>

        <div class="text-[13px] font-bold text-[#1e2538] min-w-[52px] text-right">
          ${item.price}
        </div>

        <div class="hidden md:block text-[12px] font-medium text-[#9ba3b5] min-w-[110px] text-right">
          ${item.date}
        </div>

        <div class="relative">
          <button
            onclick="cycleBookingAction(${item.id})"
            class="p-1.5 rounded-lg text-[#9ba3b5] hover:text-[#1e2538] hover:bg-slate-100 transition"
            title="Quick Action"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="5" r="1.8"/>
              <circle cx="12" cy="12" r="1.8"/>
              <circle cx="12" cy="19" r="1.8"/>
            </svg>
          </button>
        </div>
      </div>
    `;
  }).join('');

  const sc = document.getElementById('view-scroll-container');
  if (sc) setTimeout(() => handleViewportScroll(sc), 40);
}

function toggleBookingStatus(id) {
  const booking = bookingsData.find((b) => b.id === id);
  if (!booking) return;
  booking.status = booking.status === 'Approved' ? 'Pending' : 'Approved';
  renderBookings(document.getElementById('searchInput').value);
  showToast(`${booking.title} status updated to ${booking.status}`);
}

function cycleBookingAction(id) {
  const booking = bookingsData.find((b) => b.id === id);
  if (!booking) return;
  showToast(`Check-in instructions sent for ${booking.title} (${booking.price})`);
}

function toggleShowAllBookings() {
  showAllBookingsFlag = !showAllBookingsFlag;
  document.getElementById('showAllText').textContent = showAllBookingsFlag ? 'Show less' : `Show all (${bookingsData.length})`;
  document.getElementById('showAllArrow').style.transform = showAllBookingsFlag ? 'rotate(90deg)' : 'rotate(0deg)';
  renderBookings(document.getElementById('searchInput').value);
}

/* ==================== PROPERTY BADGES ==================== */

function getPropertyBadgeSVG(type) {
  if (type === 'valencia') {
    return `
      <svg class="w-11 h-11 rounded-full flex-shrink-0 shadow-xs" viewBox="0 0 44 44" fill="none">
        <clipPath id="clipValencia"><circle cx="22" cy="22" r="22"/></clipPath>
        <g clip-path="url(#clipValencia)">
          <rect width="44" height="44" fill="#f7cad5"/>
          <path d="M18 10 H44 V32 H18 Z" fill="#fae06c"/>
          <path d="M23 32 V19 C23 16 27 16 27 19 V32 Z" fill="#ffffff"/>
          <path d="M32 32 V19 C32 16 36 16 36 19 V32 Z" fill="#ffffff"/>
          <line x1="14" y1="22" x2="44" y2="22" stroke="#1e2538" stroke-width="1.2"/>
          <line x1="20" y1="22" x2="20" y2="30" stroke="#1e2538" stroke-width="1.2"/>
          <line x1="25" y1="22" x2="25" y2="30" stroke="#1e2538" stroke-width="1.2"/>
          <line x1="30" y1="22" x2="30" y2="30" stroke="#1e2538" stroke-width="1.2"/>
          <line x1="35" y1="22" x2="35" y2="30" stroke="#1e2538" stroke-width="1.2"/>
          <rect x="0" y="30" width="44" height="14" fill="#29a399"/>
          <path d="M0 34 Q11 32 22 34 T44 34" stroke="#ffffff" stroke-width="1.3" fill="none"/>
        </g>
      </svg>`;
  } else if (type === 'pool') {
    return `
      <svg class="w-11 h-11 rounded-full flex-shrink-0 shadow-xs" viewBox="0 0 44 44" fill="none">
        <clipPath id="clipPool"><circle cx="22" cy="22" r="22"/></clipPath>
        <g clip-path="url(#clipPool)">
          <rect width="44" height="20" fill="#f7cad5"/>
          <rect y="18" width="44" height="26" fill="#9be4f2"/>
          <path d="M0 19 Q11 16 22 19 T44 19" stroke="#ffffff" stroke-width="1.8" fill="none"/>
          <path d="M29 14 V30 M35 14 V30 M29 19 H35 M29 24 H35" stroke="#1e2538" stroke-width="1.3" stroke-linecap="round"/>
        </g>
      </svg>`;
  } else {
    return `
      <svg class="w-11 h-11 rounded-full flex-shrink-0 shadow-xs" viewBox="0 0 44 44" fill="none">
        <clipPath id="clipStudio"><circle cx="22" cy="22" r="22"/></clipPath>
        <g clip-path="url(#clipStudio)">
          <rect width="22" height="44" fill="#f7cad5"/>
          <rect x="22" width="22" height="44" fill="#dcf5fb"/>
          <path d="M18 8 H32 V44 H18 Z" fill="#fae06c"/>
          <circle cx="14" cy="24" r="6" fill="#f49fb6"/>
        </g>
      </svg>`;
  }
}

/* ==================== HOME: HOUSEKEEPING ==================== */

function renderHousekeeping(filterText = '') {
  const el = document.getElementById('housekeepingList');
  if (!el) return;
  const q = filterText.trim().toLowerCase();
  const filtered = housekeepingUnits.filter((u) => !q || u.unit.toLowerCase().includes(q) || u.status.toLowerCase().includes(q));

  const readyCount = housekeepingUnits.filter((u) => u.status === 'Ready').length;
  const summaryBadge = document.getElementById('turnoverSummaryBadge');
  if (summaryBadge) summaryBadge.textContent = `${readyCount} of ${housekeepingUnits.length} Ready`;

  el.innerHTML = filtered.map((u) => {
    let pillStyle = 'bg-[#def4f0] text-[#29a399]';
    if (u.status === 'Cleaning') pillStyle = 'bg-[#fef8df] text-[#d4a72c]';
    if (u.status === 'Inspecting') pillStyle = 'bg-[#dcf5fb] text-[#1e877e]';

    return `
      <div class="bg-white rounded-2xl p-3 flex items-center justify-between gap-3 border border-slate-100/80">
        <div class="flex items-center gap-3">
          ${getPropertyBadgeSVG(u.badgeType)}
          <div>
            <h4 class="text-xs font-extrabold text-[#1e2538]">${escapeHTML(u.unit)}</h4>
            <p class="text-[11px] text-[#9ba3b5]">Host team: ${escapeHTML(u.cleaner)} • Check-in ${u.checkIn}</p>
          </div>
        </div>
        <button onclick="cycleHousekeepingStatus(${u.id})" class="px-3.5 py-1.5 rounded-full text-[11px] font-extrabold transition active:scale-95 ${pillStyle}">
          ${u.status} ↻
        </button>
      </div>
    `;
  }).join('');
}

function cycleHousekeepingStatus(id) {
  const stages = ['Cleaning', 'Inspecting', 'Ready'];
  const item = housekeepingUnits.find((u) => u.id === id);
  if (!item) return;
  const nextIdx = (stages.indexOf(item.status) + 1) % stages.length;
  item.status = stages[nextIdx];
  renderHousekeeping(document.getElementById('searchInput').value);
  showToast(`${item.unit} cleaning status: ${item.status}`);
}

/* ==================== RATE PLANS ==================== */

function renderRatePlans(filterText = '') {
  const grid = document.getElementById('ratePlansGrid');
  if (!grid) return;
  const q = filterText.trim().toLowerCase();
  const filtered = ratePlansData.filter((r) => !q || r.name.toLowerCase().includes(q) || r.badge.toLowerCase().includes(q));

  grid.innerHTML = filtered.map((plan) => `
    <div class="hover-lift ${plan.bg} border border-slate-100 rounded-[22px] p-5 flex flex-col justify-between">
      <div>
        <div class="flex items-center justify-between gap-2 mb-2">
          <span class="text-[10.5px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white text-[#29a399]">${plan.badge}</span>
          <button onclick="toggleRatePlanActive(${plan.id})" class="w-10 h-5 rounded-full transition-colors p-0.5 ${plan.active ? 'bg-[#29a399]' : 'bg-slate-300'}">
            <span class="block w-4 h-4 rounded-full bg-white shadow transform transition-transform ${plan.active ? 'translate-x-5' : 'translate-x-0'}"></span>
          </button>
        </div>
        <h3 class="text-[16px] font-extrabold text-[#1e2538]">${escapeHTML(plan.name)}</h3>
        <p class="text-xs text-[#9ba3b5] mt-1">${escapeHTML(plan.rule)}</p>
      </div>
      <div class="mt-4 pt-3 border-t border-slate-200/50 flex items-center justify-between text-xs">
        <span class="font-bold text-[#1e2538]">${plan.yield}</span>
        <span class="font-extrabold ${plan.active ? 'text-[#29a399]' : 'text-[#9ba3b5]'}">${plan.active ? '● Active Plan' : '○ Paused'}</span>
      </div>
    </div>
  `).join('');

  // Render 7-Day Matrix
  const tbody = document.getElementById('rateMatrixBody');
  if (!tbody) return;
  tbody.innerHTML = rateMatrixData.map((row, rIdx) => `
    <tr>
      <td class="py-2.5 pr-3 font-bold text-[#1e2538]">${escapeHTML(row.unit)}</td>
      ${row.rates.map((rate, cIdx) => {
        const isSurge = row.surges[cIdx];
        return `
          <td class="py-2 px-1.5 text-center">
            <button
              onclick="toggleMatrixCell(${rIdx}, ${cIdx})"
              class="w-full py-1.5 px-2 rounded-xl font-extrabold text-[11.5px] transition active:scale-95 ${isSurge ? 'bg-[#fae06c] text-[#1e2538] shadow-2xs' : 'bg-white text-[#29a399] border border-slate-100 hover:border-[#29a399]'}"
            >
              $${rate}
            </button>
          </td>
        `;
      }).join('')}
    </tr>
  `).join('');
}

function toggleRatePlanActive(id) {
  const plan = ratePlansData.find((p) => p.id === id);
  if (!plan) return;
  plan.active = !plan.active;
  renderRatePlans(document.getElementById('searchInput').value);
  showToast(`${plan.name} ${plan.active ? 'activated' : 'paused'}`);
}

function toggleMatrixCell(rIdx, cIdx) {
  const row = rateMatrixData[rIdx];
  const wasSurge = row.surges[cIdx];
  row.surges[cIdx] = !wasSurge;
  row.rates[cIdx] = wasSurge ? Math.round(row.rates[cIdx] / 1.15) : Math.round(row.rates[cIdx] * 1.15);
  renderRatePlans(document.getElementById('searchInput').value);
  showToast(`Updated ${row.unit} rate to $${row.rates[cIdx]}/night`);
}

/* ==================== APARTMENTS ==================== */

function filterApartments(category) {
  currentAptFilter = category;
  document.querySelectorAll('.apt-filter-btn').forEach((btn) => {
    const isMatch = btn.getAttribute('data-apt-filter') === category;
    btn.className = isMatch
      ? 'apt-filter-btn bg-white text-[#1e2538] shadow-2xs text-xs font-bold px-3.5 py-1.5 rounded-full transition'
      : 'apt-filter-btn text-[#9ba3b5] hover:text-[#1e2538] text-xs font-bold px-3.5 py-1.5 rounded-full transition';
  });
  renderApartments(document.getElementById('searchInput').value);
}

function renderApartments(searchTerm = '') {
  const grid = document.getElementById('apartmentsGrid');
  if (!grid) return;
  const q = searchTerm.trim().toLowerCase();

  const filtered = apartmentsPortfolio.filter((apt) => {
    if (currentAptFilter !== 'All' && apt.status !== currentAptFilter) return false;
    if (!q) return true;
    return apt.name.toLowerCase().includes(q) || apt.specs.toLowerCase().includes(q) || apt.status.toLowerCase().includes(q);
  });

  grid.innerHTML = filtered.map((apt) => {
    const isOccupied = apt.status === 'Occupied';
    const statusBadge = isOccupied
      ? 'bg-[#def4f0] text-[#29a399]'
      : 'bg-[#fef8df] text-[#d4a72c]';

    return `
      <div class="hover-lift bg-slate-50/70 border border-slate-100 rounded-[24px] p-5 flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between mb-4">
            ${getPropertyBadgeSVG(apt.badgeType)}
            <div class="flex items-center gap-2">
              <span class="text-xs font-extrabold text-[#1e2538] bg-white px-2.5 py-1 rounded-full shadow-2xs">★ ${apt.rating}</span>
              <button onclick="toggleApartmentUnitStatus(${apt.id})" class="px-3 py-1 rounded-full text-[11px] font-bold ${statusBadge}">
                ${apt.status}
              </button>
            </div>
          </div>
          <h3 class="text-[15.5px] font-extrabold text-[#1e2538]">${escapeHTML(apt.name)}</h3>
          <p class="text-[11.5px] text-[#9ba3b5] mt-0.5 mb-4">${escapeHTML(apt.specs)}</p>

          <div class="mb-3">
            <div class="flex justify-between text-[11px] font-bold mb-1">
              <span class="text-[#9ba3b5]">Monthly Occupancy</span>
              <span class="text-[#1e2538]">${apt.occ}%</span>
            </div>
            <div class="w-full h-1.5 bg-white rounded-full overflow-hidden">
              <div class="h-full bg-[#29a399] rounded-full" style="width: ${apt.occ}%"></div>
            </div>
          </div>
        </div>

        <div class="pt-3 border-t border-slate-200/60 flex items-center justify-between">
          <div>
            <span class="text-sm font-extrabold text-[#1e2538]">${apt.rate}</span>
            <span class="text-[11px] text-[#9ba3b5]"> / night</span>
          </div>
          <button onclick="switchNav('Pricing'); showToast('Loaded ${escapeHTML(apt.name)} into Smart Pricing Simulator');" class="text-xs font-bold text-[#29a399] hover:underline">
            Adjust Pricing →
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function toggleApartmentUnitStatus(id) {
  const apt = apartmentsPortfolio.find((a) => a.id === id);
  if (!apt) return;
  apt.status = apt.status === 'Occupied' ? 'Available' : 'Occupied';
  renderApartments(document.getElementById('searchInput').value);
  showToast(`${apt.name} marked as ${apt.status}`);
}

/* ==================== PRICING ==================== */

function toggleAutopilotPricing() {
  autopilotEnabled = !autopilotEnabled;
  const btn = document.getElementById('autopilotToggleBtn');
  const knob = document.getElementById('autopilotKnob');
  btn.className = `w-11 h-6 rounded-full relative transition-colors p-0.5 ${autopilotEnabled ? 'bg-[#29a399]' : 'bg-slate-300'}`;
  knob.className = `block w-5 h-5 rounded-full bg-white shadow transform transition-transform ${autopilotEnabled ? 'translate-x-5' : 'translate-x-0'}`;
  showToast(`Auto-Pilot AI Pricing ${autopilotEnabled ? 'enabled' : 'paused'}`);
}

function updatePricingSimulator() {
  const base = parseInt(document.getElementById('simBaseInput')?.value || 220, 10);
  const surge = parseInt(document.getElementById('simSurgeInput')?.value || 25, 10);
  const disc = parseInt(document.getElementById('simDiscountInput')?.value || 15, 10);

  document.getElementById('simBaseLabel').textContent = `$${base} / night`;
  document.getElementById('simSurgeLabel').textContent = `+${surge}%`;
  document.getElementById('simDiscountLabel').textContent = `-${disc}%`;

  const weekendRate = Math.round(base * (1 + surge / 100));
  const promoRate = Math.round(base * (1 - disc / 100));
  const estOcc = Math.min(98, Math.max(68, Math.round(88 - (base - 220) * 0.06 + disc * 0.35)));
  const projectedMonthly = Math.round((base * 18 + weekendRate * 8 + promoRate * 4) * (estOcc / 100));

  document.getElementById('simProjectedTotal').textContent = `$${projectedMonthly.toLocaleString()}`;
  document.getElementById('simProjectedOcc').textContent = `${estOcc}%`;

  const days = [
    { d: 'Mon', r: promoRate, c: 'bg-[#dcf5fb]' },
    { d: 'Tue', r: base, c: 'bg-[#dcf5fb]' },
    { d: 'Wed', r: base, c: 'bg-[#dcf5fb]' },
    { d: 'Thu', r: base, c: 'bg-[#aee8f7]' },
    { d: 'Fri', r: weekendRate, c: 'bg-[#fae06c]' },
    { d: 'Sat', r: weekendRate, c: 'bg-[#fae06c]' },
    { d: 'Sun', r: Math.round((base + weekendRate) / 2), c: 'bg-[#aee8f7]' },
  ];

  const maxSim = Math.max(...days.map((d) => d.r), 400);
  const barsEl = document.getElementById('simBarsContainer');
  if (barsEl) {
    barsEl.innerHTML = days.map((item) => {
      const h = Math.max(22, Math.round((item.r / maxSim) * 100));
      return `
        <div class="flex-1 flex flex-col items-center justify-end h-full">
          <span class="text-[10px] font-extrabold text-[#1e2538] mb-1">$${item.r}</span>
          <div class="w-full max-w-[26px] rounded-t-lg transition-all duration-300 ${item.c}" style="height: ${h}%"></div>
          <span class="text-[10px] font-bold text-[#9ba3b5] mt-1">${item.d}</span>
        </div>
      `;
    }).join('');
  }

  const rulesEl = document.getElementById('pricingRulesList');
  if (rulesEl) {
    rulesEl.innerHTML = pricingRules.map((r) => `
      <div class="bg-white rounded-2xl p-3.5 border border-slate-100 flex flex-col justify-between">
        <div class="flex items-center justify-between gap-2 mb-1.5">
          <h4 class="text-xs font-extrabold text-[#1e2538]">${escapeHTML(r.title)}</h4>
          <button onclick="togglePricingRule(${r.id})" class="text-[10.5px] font-extrabold px-2.5 py-0.5 rounded-full ${r.active ? 'bg-[#def4f0] text-[#29a399]' : 'bg-slate-100 text-[#9ba3b5]'}">
            ${r.active ? 'ON' : 'OFF'}
          </button>
        </div>
        <p class="text-[11px] text-[#9ba3b5] leading-relaxed">${escapeHTML(r.desc)}</p>
      </div>
    `).join('');
  }
}

function togglePricingRule(id) {
  const rule = pricingRules.find((r) => r.id === id);
  if (!rule) return;
  rule.active = !rule.active;
  updatePricingSimulator();
  showToast(`${rule.title}: ${rule.active ? 'Enabled' : 'Disabled'}`);
}

/* ==================== SUPPORT: FAQ & CHAT ==================== */

function renderSupportFAQs(filterText = '') {
  const list = document.getElementById('faqAccordionList');
  if (!list) return;
  const q = filterText.trim().toLowerCase();
  const filtered = faqItems.filter((f) => !q || f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q));

  list.innerHTML = filtered.map((item) => `
    <div class="bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden">
      <button onclick="toggleFaqItem(${item.id})" class="w-full px-4 py-3 text-left flex items-center justify-between gap-2 text-xs font-extrabold text-[#1e2538] hover:text-[#29a399] transition">
        <span>${escapeHTML(item.q)}</span>
        <span class="text-sm">${item.open ? '−' : '+'}</span>
      </button>
      ${item.open ? `<div class="px-4 pb-3.5 text-[11.5px] text-[#9ba3b5] leading-relaxed">${escapeHTML(item.a)}</div>` : ''}
    </div>
  `).join('');
}

function toggleFaqItem(id) {
  const item = faqItems.find((f) => f.id === id);
  if (!item) return;
  item.open = !item.open;
  renderSupportFAQs(document.getElementById('searchInput').value);
}

function sendQuickSupportPrompt(text) {
  const input = document.getElementById('supportChatInput');
  input.value = text;
  handleChatSubmit(new Event('submit'));
}

function handleChatSubmit(e) {
  if (e && e.preventDefault) e.preventDefault();
  const input = document.getElementById('supportChatInput');
  const msg = input.value.trim();
  if (!msg) return;
  input.value = '';

  const chatBox = document.getElementById('supportChatMessages');
  chatBox.innerHTML += `
    <div class="flex justify-end">
      <div class="bg-[#29a399] text-white rounded-2xl rounded-tr-xs px-3.5 py-2 max-w-[82%] shadow-2xs">
        <p class="font-medium">${escapeHTML(msg)}</p>
      </div>
    </div>
  `;
  chatBox.scrollTop = chatBox.scrollHeight;

  setTimeout(() => {
    let reply = "I've updated your host preferences and synced your PinHome calendar across all 6 apartments!";
    if (msg.toLowerCase().includes('payout')) {
      reply = 'Your next payout of $1,894.83 (March 9 earnings) is verified and arriving in your linked bank account tomorrow at 09:00.';
    } else if (msg.toLowerCase().includes('approve')) {
      const pendingBooking = bookingsData.find((b) => b.id === 2);
      if (pendingBooking) pendingBooking.status = 'Approved';
      renderBookings('');
      reply = "Done! I have approved the 'Night swimingpool' booking ($1000) and dispatched the smart-lock code to the guest.";
    }
    chatBox.innerHTML += `
      <div class="flex items-start gap-2">
        <div class="bg-white border border-slate-100 text-[#1e2538] rounded-2xl rounded-tl-xs px-3.5 py-2.5 max-w-[85%] shadow-2xs">
          <p class="font-medium">${escapeHTML(reply)}</p>
        </div>
      </div>
    `;
    chatBox.scrollTop = chatBox.scrollHeight;
  }, 450);
}

/* ==================== GLOBAL SEARCH ==================== */

function handleGlobalSearch(val) {
  const clearBtn = document.getElementById('clearSearchBtn');
  clearBtn.classList.toggle('hidden', val.trim().length === 0);

  if (currentNav === 'Bookings') renderBookings(val);
  else if (currentNav === 'Home') renderHousekeeping(val);
  else if (currentNav === 'Rate plans') renderRatePlans(val);
  else if (currentNav === 'Apartments') renderApartments(val);
  else if (currentNav === 'Support') renderSupportFAQs(val);
}

function clearSearch() {
  const input = document.getElementById('searchInput');
  input.value = '';
  handleGlobalSearch('');
}

/* ==================== MOBILE SIDEBAR ==================== */

function toggleMobileSidebar() {
  const nav = document.getElementById('sidebarNav');
  nav.classList.toggle('hidden');
  nav.classList.toggle('flex');
  setTimeout(updateSlidingPillPosition, 50);
}

/* ==================== DOWNLOAD REPORT & MODALS ==================== */

function triggerDownloadReport() {
  const btnText = document.getElementById('downloadBtnText');
  const original = btnText.textContent;
  btnText.textContent = 'Generating CSV...';

  setTimeout(() => {
    btnText.textContent = 'Downloaded ✓';
    showToast('Report "PinHome_Bookings_March.csv" downloaded!');
    setTimeout(() => {
      btnText.textContent = original;
    }, 1800);
  }, 600);
}

function toggleNotifications() {
  document.getElementById('notifDropdown').classList.toggle('hidden');
}

function markNotificationsRead() {
  document.getElementById('notifDot').classList.add('hidden');
  document.getElementById('notifDropdown').classList.add('hidden');
  showToast('All notifications marked as read');
}

function openPromoModal() {
  const modal = document.getElementById('promoModal');
  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function openNewBookingModal() {
  const modal = document.getElementById('newBookingModal');
  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function openUpgradeModal() {
  const modal = document.getElementById('upgradeModal');
  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function openLogoutModal() {
  const modal = document.getElementById('logoutModal');
  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function closeModal(id) {
  const modal = document.getElementById(id);
  modal.classList.add('hidden');
  modal.classList.remove('flex');
}

function submitPromotion(e) {
  e.preventDefault();
  const apt = document.getElementById('promoApartment').value;
  const discount = document.getElementById('discountValueLabel').innerText;
  closeModal('promoModal');
  showToast(`Last-minute promotion (${discount}) launched for ${apt}!`);
}

function submitNewBooking(e) {
  e.preventDefault();
  const title = document.getElementById('nbTitle').value;
  const nights = document.getElementById('nbNights').value;
  const price = document.getElementById('nbPrice').value;

  bookingsData.unshift({
    id: Date.now(),
    title,
    nights: `${nights} nights`,
    avatar: APP_CONFIG.guestAvatar,
    status: 'Approved',
    price: `$${price}`,
    date: 'March 6, at 16:00',
    badgeType: title.includes('pool') ? 'pool' : title.includes('studio') ? 'studio' : 'valencia',
  });

  closeModal('newBookingModal');
  renderBookings('');
  switchNav('Bookings');
  showToast(`Added new booking for ${title} ($${price})!`);
}

function activateProUpgrade() {
  closeModal('upgradeModal');
  document.getElementById('proBadgeSidebar').classList.remove('hidden');
  document.getElementById('upgradeCardTitle').textContent = 'PinHome Pro';
  document.getElementById('upgradeCardDesc').textContent = 'All AI dynamic pricing & channel sync features active!';
  document.getElementById('upgradeCardBtn').textContent = 'Pro Active ✓';
  showToast('🎉 PinHome Pro unlocked! All platform features enabled.');
}

function confirmLogout() {
  closeModal('logoutModal');
  const lockScreen = document.getElementById('loggedOutScreen');
  lockScreen.classList.remove('hidden');
  lockScreen.classList.add('flex');
}

function signBackIn() {
  const lockScreen = document.getElementById('loggedOutScreen');
  lockScreen.classList.add('hidden');
  lockScreen.classList.remove('flex');
  switchNav('Bookings');
  showToast(`Welcome back, ${APP_CONFIG.hostName}!`);
}

/* ==================== TOAST & UTILS ==================== */

// Escape user-provided strings before injecting into innerHTML
function escapeHTML(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function showToast(message) {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = 'bg-[#1e2538] text-white text-xs font-semibold px-4 py-3 rounded-2xl shadow-lg flex items-center gap-2.5 pointer-events-auto transition-all duration-300';
  toast.innerHTML = `
    <span class="w-2 h-2 rounded-full bg-[#fae06c]"></span>
    <span>${escapeHTML(message)}</span>
  `;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(8px)';
    setTimeout(() => toast.remove(), 300);
  }, 2800);
}

window.addEventListener('resize', () => {
  updateSlidingPillPosition();
  if (currentNav === 'Bookings') {
    updateTooltipPosition(activeDayIndex);
  }
});

// Initialize All Views & Animations on Load
window.addEventListener('load', () => {
  renderSidebarIcons();
  updateSlidingPillPosition();
  renderChart(true);
  renderBookings('');
  renderHousekeeping('');
  renderRatePlans('');
  renderApartments('');
  updatePricingSimulator();
  renderSupportFAQs('');
  const sc = document.getElementById('view-scroll-container');
  if (sc) handleViewportScroll(sc);
});

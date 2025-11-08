document.addEventListener('DOMContentLoaded', () => {

    // Tạo option Month & Year
    function createOptions(selectId, start, end) {
        const container = document.querySelector(`#${selectId} .select-items`);
        for (let i = start; i <= end; i++) {
            const div = document.createElement('div');
            div.textContent = i;
            container.appendChild(div);
        }
        attachClickEvent(selectId); 
    }

    createOptions('monthSelect', 1, 12);

    const currentYear = new Date().getFullYear();
    createOptions('yearSelect', 1950, currentYear);

    // Hàm kiểm tra năm nhuận
    function isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    }

    function getDaysInMonth(month, year) {
        month = parseInt(month);
        year = parseInt(year);
        if ([1,3,5,7,8,10,12].includes(month)) return 31;
        if ([4,6,9,11].includes(month)) return 30;
        if (month === 2) return isLeapYear(year) ? 29 : 28;
        return 31;
    }

    // Tạo dropdown day
    function createDayOptions(max = 31) {
        const dayContainer = document.querySelector('#daySelect .select-items');
        dayContainer.innerHTML = '';
        for (let i = 1; i <= max; i++) {
            const div = document.createElement('div');
            div.textContent = i;
            dayContainer.appendChild(div);
        }
        attachClickEvent('daySelect'); // gán click cho day mới
    }

    createDayOptions();

    // Gán click event cho các option trong dropdown
    function attachClickEvent(selectId) {
        const selected = document.querySelector(`#${selectId} .select-selected`);
        const items = document.querySelector(`#${selectId} .select-items`);
        items.querySelectorAll('div').forEach(option => {
            option.addEventListener('click', () => {
                selected.textContent = option.textContent;
                selected.classList.remove('active');
                if (selectId === "monthSelect" || selectId === "yearSelect") updateDays();
            });
        });
    }

    // Update day khi chọn month/year
    function updateDays() {
        const month = document.querySelector('#monthSelect .select-selected').textContent;
        const year = document.querySelector('#yearSelect .select-selected').textContent;
        const daySelected = document.querySelector('#daySelect .select-selected');

        if (!month || month === "Month" || !year || year === "Year") return;

        const maxDays = getDaysInMonth(month, year);
        createDayOptions(maxDays);

        // reset day nếu lớn hơn max
        if (parseInt(daySelected.textContent) > maxDays) {
            daySelected.textContent = "Day";
        }
    }

    // Click mở/đóng dropdown
    document.querySelectorAll('.custom-select').forEach(sel => {
        const selected = sel.querySelector('.select-selected');

        selected.addEventListener('click', (e) => {
            e.stopPropagation();
            document.querySelectorAll('.select-selected').forEach(s => {
                if (s !== selected) s.classList.remove('active');
            });
            selected.classList.toggle('active');
        });
    });

    // Click ra ngoài đóng tất cả dropdown
    document.addEventListener('click', () => {
        document.querySelectorAll('.select-selected').forEach(s => s.classList.remove('active'));
    });
});

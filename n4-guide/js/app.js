// 搜尋功能實作
document.addEventListener('DOMContentLoaded', () => {
    const grammarSearch = document.getElementById('grammarSearch');
    const vocabSearch = document.getElementById('vocabSearch');

    // Populate allList with items from other lists
    const allList = document.getElementById('allList');
    if (allList && allList.children.length <= 1) { // Only contains the comment
        const otherLists = ['verbList', 'nounList', 'adjList', 'otherList'];
        otherLists.forEach(listId => {
            const list = document.getElementById(listId);
            if (list) {
                const items = list.querySelectorAll('.vocab-item');
                items.forEach(item => {
                    allList.appendChild(item.cloneNode(true));
                });
            }
        });
    }

    if (grammarSearch) {
        grammarSearch.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            const items = document.querySelectorAll('.grammar-item');
            items.forEach(item => {
                const text = item.textContent.toLowerCase();
                item.style.display = text.includes(term) ? 'block' : 'none';
            });
        });
    }

    if (vocabSearch) {
        vocabSearch.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            const activeList = document.querySelector('.category-list.active');
            if (activeList) {
                const items = activeList.querySelectorAll('.vocab-item');
                items.forEach(item => {
                    const text = item.textContent.toLowerCase();
                    item.style.display = text.includes(term) ? 'block' : 'none';
                });
            }
        });
    }

    // Tab switching for Vocabulary
    const tabBtns = document.querySelectorAll('.tab-btn');
    const categoryLists = document.querySelectorAll('.category-list');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            
            // Update buttons
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Update lists
            categoryLists.forEach(list => {
                if (list.id === targetId) {
                    list.classList.add('active');
                } else {
                    list.classList.remove('active');
                }
            });

            // Trigger search filter on new active list if there's a search term
            if (vocabSearch && vocabSearch.value) {
                vocabSearch.dispatchEvent(new Event('input'));
            }
        });
    });
});

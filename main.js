document.addEventListener('DOMContentLoaded', function () {
  const postsContainer = document.getElementById('posts');
  const totalPostsBadge = document.getElementById('total-posts-badge');
  const searchInput = document.getElementById('searchInput');
  const categoryFilters = document.getElementById('categoryFilters');

  // Starter post if localStorage is completely empty on first visit
  const defaultPosts = [
    {
      title: 'Welcome to Your Upgraded SimpleBlog!',
      content: 'This is a sample article to showcase your new responsive layout. You can click on any article title to read it in full screen, use the Search & Category filters above, or click "Edit" to modify posts inside a sleek modal window without annoying browser popups.',
      category: 'Technology',
      author: 'Admin',
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    }
  ];

  let posts = JSON.parse(localStorage.getItem('posts'));
  if (!posts) {
    posts = defaultPosts;
    localStorage.setItem('posts', JSON.stringify(posts));
  }

  let activeCategory = 'All';
  let searchQuery = '';
  let currentEditIndex = null;

  // Escape HTML to prevent XSS when displaying posts
  function escapeHTML(str = '') {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Calculate reading time
  function getReadingTime(text = '') {
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    const mins = Math.max(1, Math.ceil(words / 200));
    return `${mins} min read`;
  }

  // Render Posts on Homepage
  function displayPosts() {
    if (!postsContainer) return;

    if (totalPostsBadge) {
      totalPostsBadge.textContent = `${posts.length} ${posts.length === 1 ? 'Article' : 'Articles'} Published`;
    }

    const filtered = posts
      .map((post, originalIndex) => ({ ...post, originalIndex }))
      .filter(post => {
        const cat = post.category || 'General';
        const matchesCategory = activeCategory === 'All' || cat === activeCategory;
        const matchesSearch =
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.content.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      });

    postsContainer.innerHTML = '';

    if (filtered.length === 0) {
      postsContainer.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">📭</div>
          <h3>No articles found</h3>
          <p>${posts.length === 0 ? 'You have not published any blog posts yet.' : 'Try adjusting your search or category filter.'}</p>
          <a href="new_post.html" class="btn btn-primary">+ Create New Post</a>
        </div>
      `;
      return;
    }

    filtered.forEach(post => {
      const idx = post.originalIndex;
      const category = escapeHTML(post.category || 'General');
      const author = escapeHTML(post.author || 'Author');
      const date = escapeHTML(post.date || 'Recently');
      const readTime = getReadingTime(post.content);

      const postDiv = document.createElement('article');
      postDiv.className = 'post';
      postDiv.innerHTML = `
        <div>
          <div class="post-top">
            <span class="category-badge">${category}</span>
            <span class="read-time">⏱️ ${readTime}</span>
          </div>
          <h2 onclick="openReadModal(${idx})">${escapeHTML(post.title)}</h2>
          <p class="post-excerpt">${escapeHTML(post.content)}</p>
        </div>
        <div class="post-footer">
          <div class="post-meta">
            <strong>By ${author}</strong>
            <span>${date}</span>
          </div>
          <div class="post-actions">
            <button onclick="openReadModal(${idx})" class="btn btn-ghost btn-sm">Read</button>
            <button onclick="editPost(${idx})" class="btn btn-ghost btn-sm">Edit</button>
            <button onclick="deletePost(${idx})" class="btn btn-danger btn-sm">Delete</button>
          </div>
        </div>
      `;
      postsContainer.appendChild(postDiv);
    });
  }

  displayPosts();

  // Search Filter Listener
  if (searchInput) {
    searchInput.addEventListener('input', function (e) {
      searchQuery = e.target.value;
      displayPosts();
    });
  }

  // Category Chip Listener
  if (categoryFilters) {
    categoryFilters.addEventListener('click', function (e) {
      if (e.target.classList.contains('filter-chip')) {
        document.querySelectorAll('.filter-chip').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        activeCategory = e.target.getAttribute('data-category');
        displayPosts();
      }
    });
  }

  // ==========================================
  // NEW POST FORM (new_post.html)
  // ==========================================
  const postForm = document.getElementById('postForm');
  const contentArea = document.getElementById('content');
  const wordCounter = document.getElementById('wordCounter');

  if (contentArea && wordCounter) {
    contentArea.addEventListener('input', function () {
      const words = contentArea.value.trim().split(/\s+/).filter(Boolean).length;
      const mins = Math.max(1, Math.ceil(words / 200));
      wordCounter.textContent = `${words} words • ${mins} min read`;
    });
  }

  if (postForm) {
    postForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const title = document.getElementById('title').value.trim();
      const content = document.getElementById('content').value.trim();
      const categoryEl = document.getElementById('category');
      const authorEl = document.getElementById('author');

      const category = categoryEl ? categoryEl.value : 'General';
      const author = authorEl && authorEl.value.trim() ? authorEl.value.trim() : 'Author';
      const date = new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });

      // Add newest post to the top of the feed
      posts.unshift({ title, content, category, author, date });
      localStorage.setItem('posts', JSON.stringify(posts));
      window.location.href = 'index.html';
    });
  }

  // ==========================================
  // DELETE POST
  // ==========================================
  window.deletePost = function (index) {
    const confirmDelete = confirm(`Are you sure you want to delete "${posts[index].title}"?`);
    if (confirmDelete) {
      posts.splice(index, 1);
      localStorage.setItem('posts', JSON.stringify(posts));
      displayPosts();
    }
  };

  // ==========================================
  // EDIT POST MODAL
  // ==========================================
  const editModal = document.getElementById('editModal');
  const editForm = document.getElementById('editForm');
  const closeEditModal = document.getElementById('closeEditModal');
  const cancelEditBtn = document.getElementById('cancelEditBtn');

  window.editPost = function (index) {
    currentEditIndex = index;
    const post = posts[index];
    document.getElementById('editTitle').value = post.title || '';
    document.getElementById('editContent').value = post.content || '';
    document.getElementById('editCategory').value = post.category || 'General';
    editModal.classList.add('active');
  };

  function hideEditModal() {
    if (editModal) editModal.classList.remove('active');
    currentEditIndex = null;
  }

  if (closeEditModal) closeEditModal.addEventListener('click', hideEditModal);
  if (cancelEditBtn) cancelEditBtn.addEventListener('click', hideEditModal);

  if (editForm) {
    editForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (currentEditIndex === null) return;

      posts[currentEditIndex] = {
        ...posts[currentEditIndex],
        title: document.getElementById('editTitle').value.trim(),
        content: document.getElementById('editContent').value.trim(),
        category: document.getElementById('editCategory').value
      };

      localStorage.setItem('posts', JSON.stringify(posts));
      hideEditModal();
      displayPosts();
    });
  }

  // ==========================================
  // READ FULL POST MODAL
  // ==========================================
  const readModal = document.getElementById('readModal');
  const closeReadModal = document.getElementById('closeReadModal');

  window.openReadModal = function (index) {
    const post = posts[index];
    if (!post || !readModal) return;

    document.getElementById('readCategory').textContent = post.category || 'General';
    document.getElementById('readTitle').textContent = post.title;
    document.getElementById('readMeta').textContent = `By ${post.author || 'Author'} • ${post.date || 'Recently'} • ${getReadingTime(post.content)}`;
    document.getElementById('readBody').textContent = post.content;

    readModal.classList.add('active');
  };

  if (closeReadModal) {
    closeReadModal.addEventListener('click', () => readModal.classList.remove('active'));
  }

  // Close modals when clicking outside card
  window.addEventListener('click', function (e) {
    if (e.target === editModal) hideEditModal();
    if (e.target === readModal) readModal.classList.remove('active');
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const postsContainer = document.getElementById('posts');
  const posts = JSON.parse(localStorage.getItem('posts')) || [];

  function displayPosts() {
    if (postsContainer) {
      postsContainer.innerHTML = '';
      posts.forEach((post, index) => {
        const postDiv = document.createElement('div');
        postDiv.className = 'post';
        postDiv.innerHTML = `
          <h2>${post.title}</h2>
          <p>${post.content}</p>
          <button onclick="editPost(${index})" class="btn">Edit</button>
          <button onclick="deletePost(${index})" class="btn">Delete</button>
        `;
        postsContainer.appendChild(postDiv);
      });
    }
  }

  displayPosts();

  if (document.getElementById('postForm')) {
    document.getElementById('postForm').addEventListener('submit', function(e) {
      e.preventDefault();
      const title = document.getElementById('title').value;
      const content = document.getElementById('content').value;
      posts.push({ title, content });
      localStorage.setItem('posts', JSON.stringify(posts));
      window.location.href = 'index.html';
    });
  }

  window.deletePost = function(index) {
    posts.splice(index, 1);
    localStorage.setItem('posts', JSON.stringify(posts));
    displayPosts();
  }

  window.editPost = function(index) {
    const newTitle = prompt('Edit title:', posts[index].title);
    const newContent = prompt('Edit content:', posts[index].content);
    if (newTitle && newContent) {
      posts[index] = { title: newTitle, content: newContent };
      localStorage.setItem('posts', JSON.stringify(posts));
      displayPosts();
    }
  }
});
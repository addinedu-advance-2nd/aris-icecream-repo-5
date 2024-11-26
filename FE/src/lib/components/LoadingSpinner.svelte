<style>
    .spinner {
      display: inline-block;
      width: 50px;
      height: 50px;
      border: 4px solid rgba(0, 0, 0, 0.1);
      border-radius: 50%;
      border-top-color: #4CAF50;
      animation: spin 1s ease infinite;
      z-index: 2002;
    }
  
    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
  </style>
  
  <div class="spinner"></div>
  
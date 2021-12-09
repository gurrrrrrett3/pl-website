const stat = document.getElementById('status');

const code = localStorage.getItem('code');

const interval = setInterval(() => {

    fetch(`/yt/info/api/${code}`).then(res => res.json()).then(data => {

      const size = data.size;  

      if (size != -1) {
        stat.innerHTML = `${size} Bytes`;
      } else {
          clearInterval(interval);

          window.location.href = `/yt/download/mp3/${code}`;
      }
    
    })
}, 1000);

<script lang="ts">
	import { onMount } from "svelte";

 async function startCamera() {
      const video = document.getElementById('video') as HTMLVideoElement;
      try {
        // 获取摄像头视频流
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: 'environment', // 后置摄像头，'user' 为前置
            width: { ideal: 720 }, // 设置适合竖屏的分辨率
            height: { ideal: 1280 }
          }
        });
        video.srcObject = stream;

        // 监听设备方向变化
        window.addEventListener('orientationchange', () => {
          // 根据设备方向调整视频样式
          if (screen.orientation.type === 'landscape-primary' || screen.orientation.type === 'landscape-secondary') {
            video.style.transform = 'rotate(90deg)';
          } else {
            video.style.transform = 'rotate(0deg)';
          }
        });
      } catch (err) {
        console.error('摄像头访问失败:', err);
      }
    }

    // 页面加载时启动摄像头
    onMount(() => {
      startCamera();
      console.log(screen.orientation.type);
    });
</script>
<video id="video" autoplay playsinline></video>
<style lang="postcss">
    video {
      width: 100%;
      height: auto;
      max-height: 100vh;
      object-fit: scale-down;
      transform: rotate(0deg); /* 默认不旋转 */
    }
    /* 针对横屏设备调整 */
    @media screen and (orientation: landscape) {
      video {
        transform: rotate(90deg); /* 横屏时旋转视频 */
        width: auto;
        height: 100vh;
      }
    }
  </style>
 // 配置摄像头参数，包括自动对焦
 const constraints = {
    video: {
        height: { ideal: window.screen.height },
        width: { ideal: window.screen.width },
      focusMode: 'continuous', // 持续自动对焦
      facingMode: 'environment' // 使用后置摄像头（可以用 'user' 表示前置）
    }
  };

  // 启动摄像头
  navigator.mediaDevices.getUserMedia(constraints)
    .then((stream) => {
      video.srcObject = stream;
      
      // 获取视频轨迹以控制对焦
      const track = stream.getVideoTracks()[0];
      const capabilities = track.getCapabilities();
      
      // 检查是否支持自动对焦
      if (capabilities.focusMode) {
        track.applyConstraints({
          advanced: [{ focusMode: 'continuous' }]
        }).catch(err => console.log('对焦设置失败:', err));
      }

      // 开始自动捕获
      startAutoCapture();
    })
    .catch((err) => {
      console.error('访问摄像头失败: ', err);
    });

  // 自动捕获函数
  function startAutoCapture() {
    // 每隔一定时间捕获一次（这里设为2秒）
    const captureInterval = setInterval(() => {
      captureFrame();
    }, 2000);

    // 可选：页面关闭时清理
    window.addEventListener('unload', () => {
      clearInterval(captureInterval);
      video.srcObject.getTracks().forEach(track => track.stop());
    });
  }

  // 捕获单帧
  function captureFrame() {
    context.drawImage(video, 0, 0, 640, 480);
    const imageData = canvas.toDataURL('image/jpeg', 0.95);
    
    // 这里可以处理捕获的图片
    console.log('自动捕获图片:', imageData);
    
    // 可选：保存图片
    saveImage(imageData);
  }

  // 保存图片函数（可选）
  function saveImage(dataUrl) {
    const link = document.createElement('a');
    link.download = `photo_${Date.now()}.jpg`;
    link.href = dataUrl;
    link.click();
  }
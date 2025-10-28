// 美食数据数组
const foodData = [
    {
        name: "当然是小竹啦~",
        description: "天生丽质，可可爱爱(●'◡'●)",
        nutrition: "美的不要不要的"
    }
    
];

// DOM元素获取
const mainContainer = document.getElementById('main-container');
const videoContainer = document.getElementById('video-container');
const fullscreenVideoContainer = document.getElementById('fullscreen-video');
const resultContainer = document.getElementById('result-container');
const foodButton = document.getElementById('food-button');
const foodVideo = document.getElementById('food-video');
const fullscreenFoodVideo = document.getElementById('fullscreen-food-video');
const foodName = document.getElementById('food-name');
const foodDescription = document.getElementById('food-description');
const foodNutrition = document.getElementById('food-nutrition');
const againButton = document.getElementById('again-button');
const content = document.querySelector('.content');

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('美食推荐页面已加载');
});

// 点击推荐按钮事件
foodButton.addEventListener('click', function() {
    console.log('开始播放视频');
    showVideo();
});

// 显示视频 - 全屏播放
function showVideo() {
    console.log('开始播放全屏视频');
    
    // 隐藏按钮，显示全屏视频容器
    foodButton.style.display = 'none';
    fullscreenVideoContainer.classList.remove('hidden');
    
    // 设置全屏视频加载事件
    fullscreenFoodVideo.addEventListener('loadstart', function() {
        console.log('全屏视频开始加载');
    });
    
    fullscreenFoodVideo.addEventListener('canplay', function() {
        console.log('全屏视频可以播放');
        // 尝试进入全屏并播放视频
        enterFullscreenAndPlay();
    });
    
    fullscreenFoodVideo.addEventListener('error', function(e) {
        console.log('全屏视频加载错误:', e);
        // 如果视频加载失败，5秒后直接显示推荐
        setTimeout(() => {
            console.log('全屏视频播放失败，直接显示推荐');
            exitFullscreen();
            showRandomFood();
        }, 5000);
    });
    
    // 监听视频播放结束事件
    fullscreenFoodVideo.addEventListener('ended', onFullscreenVideoEnded);
    
    // 添加视频点击跳过功能
    fullscreenFoodVideo.addEventListener('click', skipFullscreenVideo);
    
    // 尝试播放视频
    playFullscreenVideo();
}

// 进入全屏并播放视频
function enterFullscreenAndPlay() {
    const fullscreenElement = fullscreenVideoContainer;
    
    // 尝试进入全屏模式
    if (fullscreenElement.requestFullscreen) {
        fullscreenElement.requestFullscreen();
    } else if (fullscreenElement.webkitRequestFullscreen) {
        fullscreenElement.webkitRequestFullscreen();
    } else if (fullscreenElement.msRequestFullscreen) {
        fullscreenElement.msRequestFullscreen();
    } else if (fullscreenElement.mozRequestFullScreen) {
        fullscreenElement.mozRequestFullScreen();
    }
    
    // 开始播放视频
    playFullscreenVideo();
}

// 播放全屏视频函数
function playFullscreenVideo() {
    const playPromise = fullscreenFoodVideo.play();
    
    if (playPromise !== undefined) {
        playPromise.then(() => {
            console.log('全屏视频播放成功');
        }).catch((error) => {
            console.log('全屏视频播放失败:', error);
            // 如果自动播放失败，3秒后直接显示推荐
            setTimeout(() => {
                console.log('自动播放失败，直接显示推荐');
                exitFullscreen();
                showRandomFood();
            }, 3000);
        });
    }
}

// 跳过全屏视频函数
function skipFullscreenVideo() {
    console.log('用户跳过全屏视频');
    fullscreenFoodVideo.pause();
    exitFullscreen();
    showRandomFood();
}

// 全屏视频播放结束处理
function onFullscreenVideoEnded() {
    console.log('全屏视频播放结束');
    // 退出全屏，显示结果
    exitFullscreen();
    showRandomFood();
}

// 退出全屏函数
function exitFullscreen() {
    console.log('退出全屏模式');
    
    // 隐藏全屏视频容器
    fullscreenVideoContainer.classList.add('hidden');
    
    // 停止视频播放
    fullscreenFoodVideo.pause();
    fullscreenFoodVideo.currentTime = 0;
    
    // 尝试退出全屏
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    }
    
    // 显示主页面按钮
    foodButton.style.display = 'block';
}

// 播放视频函数 - 保留原函数以防需要
function playVideo() {
    const playPromise = foodVideo.play();
    
    if (playPromise !== undefined) {
        playPromise.then(() => {
            console.log('视频播放成功');
        }).catch((error) => {
            console.log('视频播放失败:', error);
            // 如果自动播放失败，3秒后直接显示推荐
            setTimeout(() => {
                console.log('自动播放失败，直接显示推荐');
                videoContainer.classList.add('hidden');
                foodButton.style.display = 'block';
                showRandomFood();
            }, 3000);
        });
    }
}

// 跳过视频函数 - 保留原函数以防需要
function skipVideo() {
    console.log('用户跳过视频');
    foodVideo.pause();
    videoContainer.classList.add('hidden');
    foodButton.style.display = 'block';
    showRandomFood();
}

// 视频播放结束处理 - 保留原函数以防需要
function onVideoEnded() {
    console.log('视频播放结束');
    // 隐藏视频容器，显示结果
    videoContainer.classList.add('hidden');
    foodButton.style.display = 'block';
    showRandomFood();
}

// 视频播放错误处理
function onVideoError(e) {
    console.log('视频播放出错:', e);
    console.log('直接显示美食推荐');
    videoContainer.classList.add('hidden');
    showRandomFood();
}

// 显示随机美食推荐
function showRandomFood() {
    // 随机选择美食
    const randomIndex = Math.floor(Math.random() * foodData.length);
    const selectedFood = foodData[randomIndex];
    
    // 更新页面内容
    foodName.textContent = selectedFood.name;
    foodDescription.textContent = selectedFood.description;
    foodNutrition.textContent = selectedFood.nutrition;
    
    // 显示结果容器
    resultContainer.classList.remove('hidden');
}

// 再次推荐按钮事件
againButton.addEventListener('click', function() {
    console.log('重新推荐美食');
    // 隐藏结果，显示主页面
    resultContainer.classList.add('hidden');
    foodButton.style.display = 'block';
});

// 键盘事件处理
document.addEventListener('keydown', function(event) {
    // 按ESC键返回主页面或退出全屏
    if (event.key === 'Escape') {
        if (!resultContainer.classList.contains('hidden')) {
            // 在结果页面时返回主页面
            resultContainer.classList.add('hidden');
            foodButton.style.display = 'block';
        } else if (!fullscreenVideoContainer.classList.contains('hidden')) {
            // 在全屏视频页面时退出全屏
            exitFullscreen();
            showRandomFood();
        } else if (!videoContainer.classList.contains('hidden')) {
            // 在内嵌视频页面时返回主页面
            videoContainer.classList.add('hidden');
            foodButton.style.display = 'block';
            foodVideo.pause();
        }
    }
    
    // 按空格键或回车键跳过视频或重新推荐
    if (event.key === ' ' || event.key === 'Enter') {
        event.preventDefault();
        if (!resultContainer.classList.contains('hidden')) {
            // 在结果页面时重新推荐
            showRandomFood();
        } else if (!fullscreenVideoContainer.classList.contains('hidden')) {
            // 在全屏视频页面时跳过视频
            skipFullscreenVideo();
        } else if (!videoContainer.classList.contains('hidden')) {
            // 在内嵌视频页面时跳过视频
            skipVideo();
        }
    }
});

// 监听全屏状态变化事件
document.addEventListener('fullscreenchange', handleFullscreenChange);
document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
document.addEventListener('msfullscreenchange', handleFullscreenChange);
document.addEventListener('mozfullscreenchange', handleFullscreenChange);

// 处理全屏状态变化
function handleFullscreenChange() {
    const isFullscreen = !!(document.fullscreenElement || 
                          document.webkitFullscreenElement || 
                          document.msFullscreenElement || 
                          document.mozFullScreenElement);
    
    console.log('全屏状态变化:', isFullscreen ? '进入全屏' : '退出全屏');
    
    // 如果退出了全屏但视频容器还显示，则隐藏容器
    if (!isFullscreen && !fullscreenVideoContainer.classList.contains('hidden')) {
        // 检查视频是否还在播放
        if (fullscreenFoodVideo.paused || fullscreenFoodVideo.ended) {
            console.log('检测到退出全屏，隐藏视频容器');
            fullscreenVideoContainer.classList.add('hidden');
            foodButton.style.display = 'block';
        }
    }
}

// 触摸设备支持
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', function(event) {
    touchStartY = event.changedTouches[0].screenY;
});

document.addEventListener('touchend', function(event) {
    touchEndY = event.changedTouches[0].screenY;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartY - touchEndY;
    
    // 向上滑动重新推荐
    if (diff > swipeThreshold && !resultContainer.classList.contains('hidden')) {
        showRandomFood();
    }
    
    // 向下滑动返回主页面
    if (diff < -swipeThreshold && !mainContainer.classList.contains('hidden')) {
        // 可以添加返回操作
    }
}
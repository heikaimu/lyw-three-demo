/**
 * Minime 类
 * @param {String} canvasID - canvas的ID
 * @param {Object} size - 尺寸信息
 * @param {Number} size.width - 宽
 * @param {Number} size.height - 高
 * @param {Function} cb - 回调函数
 */

import { fabric } from 'fabric';

function Minime(canvasID, size) {
  this.canvasID = canvasID;
  this.size = size;

  // 生成画布
  this.createCanvas();

  // 控制器
  this.customControls();

  // 策略
  this.strategies = {
    normal: option => {
      return this.renderNormal(option);
    },
    hood: option => {
      return this.renderHood(option);
    }
  };
}

// 创建画布
Minime.prototype.createCanvas = function() {
  this.canvas = new fabric.Canvas(this.canvasID, {
    width: this.size.width || 600,
    height: this.size.height || 600,
    selection: false
  });
};

// 自定义控制器样式
Minime.prototype.customControls = function() {
  const controlsUtils = fabric.controlsUtils;
  // const scaleSkewStyleHandler = controlsUtils.scaleSkewCursorStyleHandler;
  const scaleStyleHandler = controlsUtils.scaleCursorStyleHandler;
  const scalingEqually = controlsUtils.scalingEqually;
  // const scalingYOrSkewingX = controlsUtils.scalingYOrSkewingX;
  // const scalingXOrSkewingY = controlsUtils.scalingXOrSkewingY;
  // const scaleOrSkewActionName = controlsUtils.scaleOrSkewActionName;
  // const objectControls = fabric.Object.prototype.controls;

  // 隐藏默认的
  fabric.Object.prototype.setControlsVisibility({
    tl: false, // top-left
    mt: false, // middle-top
    tr: false, // top-right
    ml: false, // middle-left
    mr: false, // middle-right
    bl: false, // bottom-left
    mb: false, // middle-bottom
    br: false, // bottom-right
    mtr: false
  });

  // 旋转
  const rotateImg = document.createElement('img');
  rotateImg.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAELklEQVRYR8VXW2gcVRj+/pOdkzZS66XeSjK7FtnMWi1NURvBCgFRfLD1Qq13VETQUlEfRFCwD/qkUiQS6YMIotJ6qRj6IG0fSvtgTMVQaJtJNsTObNRKUto0NGZndueXM7tj9zKzO1tTPI/nv33/Of9//u8QYi5zBZZ5S+Q9QmALA2kCVgC4umx+moEZAsY9D7vFgnPAmMFcHNfUTGk8KTMeeBszPUbAlc30lZyBM0S8S4D605Yz2simIQAzKd8FYxuAy+MEDtE5B0K/YTlvR9lHAjD19kMAb7jIwDVmdNiw83eH+QoFYOraNEDqjhdx8Yxhu9fUOqwDYOryNwCpRYxc6eqkYTs3Vm5UATB1+TWAzU2C7xOgvUyYaCsie9NUfiKb1HqKwDr20EOCNoCxpoGPbwzbeTSQ/wugXHBvNTDMMvjDjO3ubATweCeuSrTJj5nxeKQe4b2gMH0AfqsxhhpU++C847yw7hSmlf7JZMcNf6PQB8atxNzLoP0kvCGcLxwJ+t9MyifB+CICxDlB6FUt6gMwk9oAmF4Kr1I6NJfIb7xtErNKPqbLdxh4EcDKEP0pQfRR2sp/oGQjKVyx1JNnQkEQf2JY7sv0yyosX1aQFgPLQxSPCYhNaXth0gcar0YAwo+G5dyvbE50yQcF4fuQ6p+dSzhJGtO1pxn0ecRRvW/YzhstBb9QXU8ZlvNlyVbbAdCr9SD4GRrV5bcEPBIGgD2vLzNVOJjV2x8oggdbbc2ix72rp9yfx1PaWs+jkVp7Br5TAH4loCcQMvNzoo2GUMRn3TnnTrU/2qU9myAaLgI/tfQsMw8YOXdr+QRVDVU96QyMkKlLG0BXAGAJJVamrPk/w7I1damyWBv7JJgPGjm3r5SEHCLC+hrbnAJwHkBHhaDqoQj2y9W/PXZwpcg8beTca0vd076Twap7Ktd8GAClUAXiooL7Y5n/ytju9f4VhLe6D6DqCipPog3Y7gGbGWgt8wtO9hm2c1+pBtoPA3xX3RXUFmFLR9xEmcH9Gdt9pVyEZ1Hz1gRFuAvAlsUMHPjyQPfebOf3m51yDQSOhsTYTSc65UNCYM9iA2DiHRnLfd3Pvkt+CsLztTE8Dw+TIpvcIa24fC8OUGLs6c45/uMWVcA+b5x3kk2HUZyAgQ4BEwR6LW3n96o9NTUXuPBHqI9gGClhjHEcheN3Ygx7hCMCYpiXLgwbYyU6nk1pvUWP1MsZtqrHcalPfQbciJDUOSLmrd05d6BScOo6XHZWyjdBiGTCqCUkgYNWmXAA4Hintl4T4g4GbgH4dq6YLfXpVzPkEFJ6KRhxAKOeGUfQ8kvCjOsYsYLV4GMSiyHHbZLQAdcQQEVh/j9fsyC14HNKTE9E8Mb67gBmmfir//w5rfRcIq/aRg+0CcCqsO85gEkB/mEu4Q4GLLrZHf0DT3m9Q/hgmucAAAAASUVORK5CYII=';

  fabric.Object.prototype.controls.rotateControl = new fabric.Control({
    x: 0.5,
    y: -0.5,
    actionHandler: controlsUtils.rotationWithSnapping,
    cursorStyleHandler: controlsUtils.rotationStyleHandler,
    render: renderIcon(rotateImg),
    cornerSize: 32
  });

  // 拉伸icon
  const zoomImg = document.createElement('img');
  zoomImg.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACeklEQVRYR8WXMWgTYRTHfy+YKxRqEetmL1pBr26Cgw66uikKrSAunUQho5OKUXRxtGCdxElsC4JurjroILo1p0M1l9GKtGLBi+TJd80l13qXu6YJ9y2By3v/9+N9773v+4SM68MEoyN/i2ebyDlgQmAM2Nty/6GwAiwX0Je/djVeHV9mNYu0pBl9KVmTTbQsKpcURtPszf8Cqyr6rIDMHq751W4+XQHcknUPpQzszhI4xmYNYdap+TeT/BMBXNtaAKZ6DLzVbdHx/Ok4rVgA17a+Agf6FDyU+eZ4/sGtmv8BuHbxO4gpsAEsXXG8xr6o8CYA1x56A3pqAJEjkvLW8f6cDj+0AVoFd2OwwVvqwv2wMAOAoNWU93HV7nh+bJ18tq3bCpUegdcKwgnTooG4Wyo+QuVqnFgI4NrWlMDRqM0OAEB0zqk1rok7xogOWzWBPUkAJrjj+YvmFzDtueOl8FPW/ZIs7bfOFwq8SFI0GWile6nfEM0mF8S1refAxQwAZr+n+wwxL1Xb+ihwLCOAMesbhMInkwEPGO8yqysKZ4CTEZt+QdQNwG9guIeq2oAoWbdQ7vbgb1zWdwLQ2Y7S0HVUH/QAEQB03YIMokEmqvZQWdCHEft3Aq9TZkU9tQgzALQzUbWLVwR5bD4IVI54/h3XtjRJIyzCrm2YEaCzHePFGUSeZAEA5lMH0TYAoi16WeBQWgY2BlHKKN4mQBTC1MZC0ha0R3HaYZQFwKR7yyEVjO1AO6kGwsPIGHU7jrMAqOrMZL3xNM42AWDzcbyRheAGnM+FJCTP9UrWgcjxUtqByPFaHoHI72HShsjzaRZC5Po4jfb1oJ7n/wATK0ss2jcIVAAAAABJRU5ErkJggg==';

  fabric.Object.prototype.controls.zoomControl = new fabric.Control({
    x: 0.5,
    y: 0.5,
    cursorStyleHandler: scaleStyleHandler,
    actionHandler: scalingEqually,
    render: renderIcon(zoomImg),
    cornerSize: 32
  });

  // 公用渲染图标
  function renderIcon(icon) {
    return function renderIcon(ctx, left, top, styleOverride, fabricObject) {
      var size = this.cornerSize;
      ctx.save();
      ctx.translate(left, top);
      ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
      ctx.drawImage(icon, -size / 2, -size / 2, size, size);
      ctx.restore();
    };
  }
};

/**
* 设置配置项目，根据type选择对应策略
* @param {String} avatarResource - 头像资源
* @param {Object} option - 配置
* @returns
*/
Minime.prototype.setOption = function({ avatar, option, skin, success }) {
  this.skin = skin || 'white';

  if (!option) {
    return;
  }

  if (typeof success === 'function') {
    this.cb = success;
  }

  // 如果当前已经有绘制内容则先清空画板
  if (this.canvas) {
    this.canvas.clear();
  }

  this.globalScale = this.size.width / option.width; // 全局缩放比例
  this.avatarResource = avatar || ''; // 头像资源
  this.option = JSON.parse(JSON.stringify(option)); // 配置
  const type = option.type; // 类型

  // 策略模式，根据type使用对应策略
  const strategy = this.strategies[type];
  if (strategy) strategy(this.option);
};

// normal类型
Minime.prototype.renderNormal = function() {
  // this.renderAvatar().then(() => {
  //   this.renderSuccess();
  // });
  // return;
  this.renderBody().then(() => {
    this.renderAvatar().then((avatar) => {
      this.canvas.setActiveObject(avatar);
      if (this.option.annex) {
        this.renderAnnexList().then(() => {
          this.renderSuccess();
        });
      } else {
        this.renderSuccess();
      }
    });
  });
};

// hood类型
Minime.prototype.renderHood = function() {
  // this.renderAvatar().then(() => {
  //   this.renderSuccess();
  // });
  // return;
  this.renderMask().then(() => {
    this.renderAvatar('source-atop').then((avatar) => {
      this.canvas.setActiveObject(avatar);
      this.renderBody('overlay', 'destination-over').then(() => {
        this.renderSuccess();
      });
    });
  });
};

// 渲染成功
Minime.prototype.renderSuccess = function() {
  if (this.cb) {
    this.cb();
  }
};

/**
* 渲染身体
* @param {String} level - 层级（背景还是覆盖层）
* @param {String} globalCompositeOperation - 叠加模式
* @returns {Promise}
*/
Minime.prototype.renderBody = function(level, globalCompositeOperation) {
  level = level || 'background';
  globalCompositeOperation = globalCompositeOperation || 'source-over';
  const item = this.option.images.find(item => item.color === this.skin);
  const url = item ? item.url : '';

  return new Promise((resolve, reject) => {
    fabric.Image.fromURL(url, img => {
      const scale = this.size.width / img.width;
      img.scale(scale).set({
        selectable: false,
        globalCompositeOperation
      });
      if (level === 'background') {
        this.canvas.setBackgroundImage(img, this.canvas.renderAll.bind(this.canvas));
      } else if (level === 'overlay') {
        this.canvas.setOverlayImage(img, this.canvas.renderAll.bind(this.canvas));
      }

      resolve();
    }, {
      crossOrigin: 'Anonymous'
    });
  });
};

/**
* 渲染遮盖svg
* @returns {Promise}
*/
Minime.prototype.renderMask = function() {
  const url = this.option.avatar.path;

  return new Promise((resolve, reject) => {
    fabric.loadSVGFromURL(url, (objects, options) => {
      const mask = fabric.util.groupSVGElements(objects, options);
      mask.scale(this.globalScale).set({
        left: this.getSize(mask.left),
        top: this.getSize(mask.top),
        fill: 'black',
        selectable: false
      });
      this.canvas.add(mask);

      resolve();
    });
  });
};

/**
* 渲染头部
* @param {String} globalCompositeOperation - 叠加模式
* @returns {Promise}
*/
Minime.prototype.renderAvatar = function(globalCompositeOperation) {
  globalCompositeOperation = globalCompositeOperation || 'source-over';
  const avatarOption = this.option.face;

  return new Promise((resolve, reject) => {
    this.avatarObject(avatarOption).then(avatar => {
      avatar.set({
        angle: avatarOption.angle || 0,
        active: true,
        globalCompositeOperation,
        // originX: 'center',
        // originY: 'bottom',
        centeredScaling: true
      });

      avatar.on('moving', e => {
        this.updateSize(avatarOption, e);
      });

      avatar.on('scaling', e => {
        this.updateSize(avatarOption, e);
      });

      avatar.on('rotating', e => {
        this.updateSize(avatarOption, e);
      });

      this.canvas.add(avatar);

      resolve(avatar);
    });
  });
};

Minime.prototype.avatarObject = function(avatarOption) {
  // avatarResource
  return new Promise((resolve, reject) => {
    if (!this.avatarResource) {
      const avatar = new fabric.Rect({
        top: this.getSize(avatarOption.top),
        left: this.getSize(avatarOption.left),
        width: this.getSize(avatarOption.width),
        height: this.getSize(avatarOption.height),
        fill: 'blue'
      });

      resolve(avatar);
    } else {
      fabric.Image.fromURL(this.avatarResource, avatar => {
        const scale = this.getSize(avatarOption.width) / avatar.width;
        avatar.scale(scale).set({
          left: this.getSize(avatarOption.left),
          top: this.getSize(avatarOption.top)
        });

        resolve(avatar);
      }, {
        crossOrigin: 'Anonymous'
      });
    }
  });
};

/**
* 渲染附件集合
* @returns {Promise}
*/
Minime.prototype.renderAnnexList = function() {
  return new Promise((resolve, reject) => {
    const annexList = this.option.annex || [];
    const promiseAnnexList = annexList.map(annex => {
      return this.renderAnnexItem(annex);
    });

    Promise.all(promiseAnnexList).then(() => {
      resolve();
    });
  });
};

/**
* 渲染附件
* @param {Object} data
* @returns {Promise}
*/
Minime.prototype.renderAnnexItem = function(data) {
  return new Promise((resolve, reject) => {
    const url = data.images[0].url;
    fabric.Image.fromURL(url, img => {
      const scale = this.getSize(data.width) / img.width;
      img.scale(scale).set({
        left: this.getSize(data.left),
        top: this.getSize(data.top),
        centeredScaling: true
      });
      this.canvas.add(img);

      resolve();

      img.on('moving', e => {
        this.updateSize(data, e);
      });

      img.on('scaling', e => {
        this.updateSize(data, e);
      });

      img.on('rotating', e => {
        this.updateSize(data, e);
      });
    }, {
      crossOrigin: 'Anonymous'
    });
  });
};

/**
* 获取尺寸信息
* @param {Number} val - 尺寸
*/
Minime.prototype.getSize = function(val) {
  if (isNaN(Number(val))) {
    return 0;
  }

  return parseInt(val * this.globalScale);
};

/**
* 设置尺寸信息
* @param {Number} val - 尺寸
*/
Minime.prototype.setSize = function(val) {
  if (isNaN(Number(val))) {
    return 0;
  }

  return parseInt(val / this.globalScale);
};

/**
* 更新尺寸
* @param {*} obj - 对象
* @param {*} e
*/
Minime.prototype.updateSize = function(obj, e) {
  const target = e.transform.target;
  const { left, top, width, height, scaleX, scaleY, angle } = target;
  obj.left = this.setSize(left);
  obj.top = this.setSize(top);
  obj.width = this.setSize(width * scaleX);
  obj.height = this.setSize(height * scaleY);
  obj.angle = angle;
};

// 获取当前配置项
Minime.prototype.getOption = function() {
  return JSON.parse(JSON.stringify(this.option));
};

// 生产最终数据
Minime.prototype.toDataURL = function() {
  return this.canvas.toDataURL({
    format: 'png',
    quality: 1
  });
};

Minime.prototype.destroy = function() {
  this.canvas.width = 0;
  this.canvas.height = 0;
  this.canvas.clear();
  this.canvas = null;
};

// 判断是否是base64
// function isBase64(str) {
//   var reg = /^\s*data:([a-z]+\/[a-z0-9-+.]+(;[a-z-]+=[a-z0-9-]+)?)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@\/?%\s]*?)\s*$/i;
//   return reg.test(str);
// }

export default Minime;

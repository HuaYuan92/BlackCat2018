<template>
  <div class="login-display">
    <transition name="fade">
      <div class="display-content bg1" v-show="step===1">
        <transition name="top1">
          <div class="display-title" v-show="step===1">
            {{bg1.tips.title}}
          </div>
        </transition>
        <transition name="top2">
          <div class="display-desc" v-show="step===1">
            {{bg1.tips.des}}
          </div>
        </transition>
        <div class="display-animation">
          <img v-for="i of bg1.imgs" :class='i.name' :src="i.img">
          <div v-for="i of bg1.info" :class="i.name">
            <img v-if="i.group===2" :src="i.img">
            {{i.tip}}
            <img v-if="i.group===1" :src="i.img">
          </div>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div class=" display-content bg2" v-show="step===2">
        <transition name="top1">
          <div class="display-title" v-show="step===2">
            {{bg2.tips.title}}
          </div>
        </transition>
        <transition name="top2">
          <div class="display-desc" v-show="step===2">
            {{bg2.tips.des}}
          </div>
        </transition>
        <div class="display-animation">
          <img v-for="i of bg2.imgs" :class='i.name' :src="i.img">
          <div v-for="i of ['wrap1','wrap2','wrap3','wrap4']" :class="i " class="wrap"></div>
          <div v-for="i of bg2.info" :class="i.name">{{i.tip}}</div>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div class="display-content bg3" v-show="step===3">
        <transition name="top1">
          <div class="display-title" v-show="step===3">
            {{bg3.tips.title}}
          </div>
        </transition>
        <transition name="top2">
          <div class="display-desc" v-show="step===3">
            {{bg3.tips.des}}
          </div>
        </transition>
        <div class="display-animation">
          <img v-for="i of bg3.imgs" :src="i.img" :class="i.name">
          <div v-for="i of bg3.info" :class="i.name">
            <img :src="img2">
            <span>{{i.tip}}</span>
          </div>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div class="display-content bg4" v-show="step===4">
        <transition name="top1">
          <div class="display-title" v-show="step===4">
            {{bg4.tips.title}}
          </div>
        </transition>
        <transition name="top2">
          <div class="display-desc" v-show="step===4">
            {{bg4.tips.des}}
          </div>
        </transition>
        <div class="display-animation">
          <img v-for="i of bg4.imgs" :src="i.img" :class="i.name">
          <div v-for="i of bg4.info" :class="i.name">
            <img :src="img3" class="img3">
            <img :src="i.img" class="img4">
          </div>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div class="display-content bg5" v-show="step===5">
        <transition name="top1">
          <div class="display-title" v-show="step===5">
            {{bg5.tips.title}}
          </div>
        </transition>
        <transition name="top2">
          <div class="display-desc" v-show="step===5">
            {{bg5.tips.des}}
          </div>
        </transition>
        <div class="display-animation">
          <img v-for="i of bg5.imgs" :src="i.img" :class="i.name">
          <div v-for="i of bg5.info" :class="i.name">
            <img :src="i.img" class="img3">
            <span>{{i.tip}}</span>
            <img :src="img4" class="img4">
          </div>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div class="display-content bg6" v-show="step===6">
        <transition name="top1">
          <div class="display-title" v-show="step===6">
            {{bg6.tips.title}}
          </div>
        </transition>
        <transition name="top2">
          <div class="display-desc" v-show="step===6">
            {{bg6.tips.des}}
          </div>
        </transition>
        <div class="display-animation">
          <img v-for="i of bg6.imgs" :src="i.img" :class="i.name">
          <div v-for="i of bg6.info" :class="i.name">
            <img :src="i.img" class="img3">
            <img :src="img5" class="img4">
          </div>
        </div>
      </div>
    </transition>
    <div id="canvas">
      <div class="login-header">
        <img :src="img1">
        <div class="login-btn-group">
          <div class="login-btn" @click="Login">
            登录
          </div>
          <div class="login-btn" @click="ToApply">
            免费试用
          </div>
        </div>
      </div>
      <ul class="login-menu">
        <li v-for="(v,i) of menu" :class="step===(i+1)?'active':''" @click="Step(i+1)">
          {{v}}
          <el-collapse-transition>
            <div v-show="step===(i+1)"></div>
          </el-collapse-transition>
        </li>
      </ul>
      <img :src="img10" class="img10" v-show="step===1" @click="step=2">
      <transition name="fade">
        <div class="login-footer" v-show="step===6">
          电话：010-59837332 邮箱：service@cycredit.com.cn 地址：北京市海淀区致真大厦B座6层
          <br>
          © 中青信用管理有限公司 京 ICP 备14045638 号 - 1 京公安网14045879
        </div>
      </transition>
    </div>
    <el-dialog
      title=""
      custom-class="dialog-login"
      :visible.sync="outerVisible"
    >
      <LoginForm></LoginForm>
      <div slot="footer"></div>
    </el-dialog>
  </div>
</template>
<script>
  import img1 from '@/assets/image/v2-1.png'
  import img2 from '@/assets/image/v2-31.png'
  import img3 from '@/assets/image/v2-38.png'
  import img4 from '@/assets/image/v2-47.png'
  import img5 from '@/assets/image/v2-55.png'
  import img10 from '@/assets/image/v2-21.png'
  import Meta from './Meta'

  const {menu, bg1, bg2, bg3, bg4, bg5, bg6} = Meta;

  export default {
    name: 'login',
    mounted() {
      /*
      * three.js构建3D模型
      * */
      const planeDefinition = 100;
      const planeSize = 1245000;
      const totalObjects = 30000;
      let frame = 0;
      let container = document.getElementById('canvas');
      let camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 400000);
      camera.position.z = 650000;
      camera.position.y = 10000;
      camera.lookAt(new THREE.Vector3(0, 6000, 0));
      let scene = new THREE.Scene();
      scene.fog = new THREE.Fog(0x23213f, 1, 300000);
      let uniforms =
        {
          time: {type: "f", value: 1.0}
        };
      let material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: document.getElementById('vertexShader').textContent,
        wireframe: true,
        fog: false
      });
      let plane = new THREE.Mesh(new THREE.PlaneGeometry(planeSize, planeSize, planeDefinition, planeDefinition), material);
      plane.rotation.x -= Math.PI * .5;
      scene.add(plane);
      let geometry = new THREE.Geometry();
      for (let i = 0; i < totalObjects; i++) {
        let vertex = new THREE.Vector3();
        vertex.x = Math.random() * planeSize - (planeSize * .5);
        vertex.y = (Math.random() * 100000) + 10000;
        vertex.z = Math.random() * planeSize - (planeSize * .5);
        geometry.vertices.push(vertex);
      }
      material = new THREE.ParticleBasicMaterial({size: 200});
      let particles = new THREE.ParticleSystem(geometry, material);
      scene.add(particles);
      let renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight * 1.76);
      container.appendChild(renderer.domElement);
      render();

      function render() {
        requestAnimationFrame(render);
        camera.position.z -= 150;
        uniforms.time.value = frame;
        frame += .04;
        renderer.render(scene, camera);
      }

      /*
      * 滚轮事件
      * */
      let that = this;
      let flag = true;

      function step(i = 0) {
        flag = false;
        if (i < 0) {
          if (that.step < 6) {
            that.step++;
          } else {
            that.step = 1;
          }
        } else {
          if (that.step > 1) {
            that.step--;
          } else {
            that.step = 6;
          }
        }
        setTimeout(() => {
          flag = true;
        }, 1000)
      }

      let scrollFunc = function (e) {
        e = e || window.event;
        if (e.wheelDelta && flag) {
          step(e.wheelDelta);
        } else if (e.detail && flag) {
          step(e.detail);
        }

      };
      /*注册事件*/
      if (document.addEventListener) {
        document.addEventListener('DOMMouseScroll', scrollFunc, false);
      }
      window.onmousewheel = document.onmousewheel = scrollFunc;
    },
    data: function () {
      return {
        img1,
        img2,
        img3,
        img4,
        img5,
        img10,
        outerVisible: false,
        menu,
        bg1,
        bg2,
        bg3,
        bg4,
        bg5,
        bg6,
        step: 1,
      }
    },
    methods: {
      Login() {
        this.outerVisible = true;
      },
      Step(num) {
        this.step = num;
      },
      ToApply(){
        this.router.push({path:'/register'})
      }
    }
  }
</script>
<style lang="less" rel="stylesheet/less" type="text/less">
  @media screen and (max-width: 1300px) {
    .display-title {
      font-size: 30px !important;
    }

    .bg1-desc {
      font-size: 14px !important;
    }

    .bg2-desc {
      font-size: 14px !important;
    }

    .bg2-desc1 {
      left: 7% !important;
    }

    .bg2-desc2 {
      left: 7% !important;
    }

    .bg3 .wrap span {
      font-size: 14px !important;
    }
  }

  @keyframes Float1 {
    0% {
      transform: translate(-50%, 0)
    }
    100% {
      transform: translate(-50%, 20px)
    }
  }

  @keyframes Float2 {
    0% {
      transform: translate(-50%, 0)
    }
    100% {
      transform: translate(-50%, 15px)
    }
  }

  @keyframes Rotate1 {
    0% {
      transform: translate(-50%, 0) rotate(0deg);
    }
    100% {
      transform: translate(-50%, 0) rotate(360deg);
    }
  }

  @keyframes Rotate2 {
    0% {
      transform: translate(-50%, 0) rotate(360deg)
    }
    100% {
      transform: translate(-50%, 0) rotate(0deg)
    }
  }

  @keyframes Rotate3 {
    0% {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    100% {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }

  .top1-enter-active {
    transition: all .8s ease 0.1s;
  }

  .top1-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .top1-enter, .top1-leave-to {
    transform: translateY(-1000px);
    opacity: 0;
  }

  .top2-enter-active {
    transition: all .8s ease;
  }

  .top2-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0) .1s;
  }

  .top2-enter, .top2-leave-to {
    transform: translateY(-1000px);
    opacity: 0;
  }

  #canvas {
    position: fixed;
    z-index: 11;
  }

  .login-display {
    width: 100%;
    overflow-y: hidden;
    margin: 0 auto;
    background-color: #616A7C;
    .bg1 {
      background: url("./../../assets/image/v2-3.jpg") center;
      .img2 {
        width: 30%;
        position: absolute;
        top: 4%;
        left: 50%;
        transform: translate(-50%, 0);
        animation: Float1 3s ease-in-out 2.4s infinite alternate;
      }
      .img3 {
        width: 40%;
        position: absolute;
        top: 30%;
        left: 50%;
        transform: translate(-50%, 0);
        animation: Float1 3s ease-in-out 2.7s infinite alternate;
      }
      .img4 {
        width: 45%;
        position: absolute;
        top: 26%;
        left: 50%;
        transform: translate(-50%, 0);
        animation: Float1 3s ease-in-out 0s infinite alternate;
      }
      .img5 {
        width: 55%;
        position: absolute;
        top: 1%;
        left: 50%;
        transform: translate(-50%, 0);
        animation: Float1 3s ease-in-out 1s infinite alternate;
      }
      .bg1-desc {
        width: 220px;
        height: 100px;
        position: absolute;
        font-size: 18px;
        color: #fff;
        text-align: left;
        img {
          width: 38px;
          height: 38px;
        }
      }
      .bg1-desc1 {
        top: 10%;
        left: 10%;
        background: url("./../../assets/image/v2-16.png") no-repeat 0 50px;
        background-size: contain;
        img {
          vertical-align: text-bottom;
          margin-left: 26px;
        }
      }
      .bg1-desc2 {
        top: 50%;
        left: 10%;
        background: url("./../../assets/image/v2-19.png") no-repeat 0 24px;
        background-size: contain;
        img {
          vertical-align: text-bottom;
          margin-left: 10px;
        }
      }
      .bg1-desc3 {
        line-height: 54px;
        top: 10%;
        left: 72%;
        background: url("./../../assets/image/v2-17.png") no-repeat 0 50px;
        background-size: contain;
        display: flex;
        justify-content: flex-end;
        img {
          vertical-align: text-bottom;
          margin-right: 26px;
        }
      }
      .bg1-desc4 {
        line-height: 54px;
        top: 50%;
        left: 72%;
        background: url("./../../assets/image/v2-18.png") no-repeat 0 24px;
        background-size: contain;
        display: flex;
        justify-content: flex-end;
        img {
          vertical-align: bottom;
          margin-right: 14px;
        }
      }
    }

    .bg2 {
      background: url("./../../assets/image/v2-4.jpg") center;
      .img1 {
        width: 24%;
        position: absolute;
        top: 21%;
        left: 50%;
        transform: translate(-50%, 0);
        animation: Float1 2s ease-in-out 1s infinite alternate;
      }
      .img2 {
        width: 36%;
        position: absolute;
        top: 11%;
        left: 50%;
        margin-left: 0%;
        animation: Rotate2 18s linear 0s infinite;
      }
      .img3 {
        width: 46%;
        position: absolute;
        top: 3%;
        left: 50%;
        animation: Rotate1 18s linear 0s infinite;
      }
      .img4 {
        width: 6%;
        position: absolute;
        top: 59%;
        left: 32%;
        z-index: 2;
        transform: translate(-50%, 0);
      }
      .img6 {
        width: 6%;
        position: absolute;
        top: 59%;
        left: 68%;
        z-index: 2;
        transform: translate(-50%, 0);
      }
      .img5 {
        width: 6%;
        position: absolute;
        top: 14%;
        left: 68.2%;
        z-index: 2;
        transform: translate(-50%, 0);
      }
      .img7 {
        width: 6%;
        position: absolute;
        top: 14%;
        left: 32%;
        z-index: 2;
        transform: translate(-50%, 0);
      }
      .wrap {
        width: 9%;
        padding-bottom: 9%;
        position: absolute;
        background: url('./../../assets/image/v2-29.png') no-repeat;
        z-index: 1;
        background-size: contain;
        animation: Rotate1 3s linear 0s infinite;
      }
      .wrap1 {
        top: 12%;
        left: 31.5%;
      }
      .wrap2 {
        top: 57.4%;
        left: 31.8%;

      }
      .wrap3 {
        top: 11.7%;
        left: 68.4%;

      }
      .wrap4 {
        top: 57.0%;
        left: 68.2%;
      }
      .bg2-desc {
        width: 144px;
        height: 25px;
        position: absolute;
        font-size: 18px;
        color: rgba(255, 255, 255, 1);
        line-height: 25px;
      }
      .bg2-desc1 {
        top: 17%;
        left: 11.6%;
        text-align: right;
      }
      .bg2-desc2 {
        top: 63%;
        left: 11.6%;
        text-align: right;
      }
      .bg2-desc3 {
        top: 17%;
        left: 75%;
        text-align: left;
      }
      .bg2-desc4 {
        top: 63%;
        left: 75%;
        text-align: left;
      }
    }

    .bg3 {
      background: url("./../../assets/image/v2-5.jpg") center;
      .img1 {
        width: 40%;
        position: absolute;
        top: 8%;
        left: 50%;
        transform: translate(-50%, 0);
      }
      .wrap {
        position: absolute;
        z-index: 1;
        background-size: contain;
        img {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 100%;
          animation: Rotate3 6s linear 0s infinite;
        }
        span {
          position: absolute;
          display: inline-block;
          width: 100%;
          top: 50%;
          left: 0;
          text-align: center;
          font-size: 18px;
          transform: translate(0, -50%);
        }
      }
      .wrap1 {
        top: 36%;
        left: 2%;
        width: 20%;
        padding-bottom: 20%;
      }
      .wrap2 {
        top: 4%;
        left: 16%;
        width: 22%;
        padding-bottom: 22%;
      }
      .wrap3 {
        top: 46%;
        left: 22%;
        width: 20%;
        padding-bottom: 20%;
      }
      .wrap4 {
        top: 31%;
        left: 51%;
        width: 14%;
        padding-bottom: 14%;
        transform: translate(-50%, 0);
      }
      .wrap5 {
        top: 2%;
        left: 59%;
        width: 20%;
        padding-bottom: 20%;
      }
      .wrap6 {
        top: 46%;
        left: 57%;
        width: 20%;
        padding-bottom: 20%;
      }
      .wrap7 {
        top: 35%;
        left: 78%;
        width: 14%;
        padding-bottom: 14%;
      }

    }

    .bg4 {
      background: url("./../../assets/image/v2-6.jpg") center;
      .img1 {
        width: 26%;
        position: absolute;
        top: 6%;
        left: 50%;
        transform: translate(-50%, 0);
        animation: Float1 2s ease-in-out .4s infinite alternate;
      }
      .img2 {
        width: 56%;
        position: absolute;
        top: 16%;
        left: 50%;
        transform: translate(-50%, 0);
        animation: Float1 2s ease-in-out .7s infinite alternate;
      }
      .wrap {
        position: absolute;
        z-index: 1;
        background-size: contain;
        .img3 {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 100%;
          animation: Rotate3 6s linear 0s infinite;
        }
        .img4 {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 54%;
          transform: translate(-50%, -50%);
        }
      }
      .wrap1 {
        top: 26%;
        left: 18.8%;
        width: 8%;
        padding-bottom: 8%;
      }
      .wrap2 {
        top: 48%;
        left: 29.6%;
        width: 6%;
        padding-bottom: 6%;
        .img4 {
          width: 48%;
        }
      }
      .wrap3 {
        top: 32%;
        left: 63.5%;
        width: 8%;
        padding-bottom: 8%;
      }
      .wrap4 {
        top: 22%;
        left: 74.8%;
        width: 6%;
        padding-bottom: 6%;
        .img4 {
          width: 48%;
        }
      }
    }

    .bg5 {
      background: url("./../../assets/image/v2-7.jpg") center;
      .img1 {
        width: 10%;
        position: absolute;
        top: 24%;
        left: 50%;
        transform: translate(-50%, 0);
        animation: Float1 2s ease-in-out -.2s infinite alternate;
      }
      .img2 {
        width: 58%;
        position: absolute;
        top: 26%;
        left: 50%;
        transform: translate(-50%, 0);
        animation: Float1 2s ease-in-out .3s infinite alternate;
      }
      .wrap {
        position: absolute;
        z-index: 1;
        background-size: contain;
        width: 8%;
        padding-bottom: 8%;
        .img3 {
          width: 100%;

        }
        span {
          display: inline-block;
          padding-top: 12px;
        }
        .img4 {
          position: absolute;
          bottom: -50%;
          left: 50%;
          width: 4%;
          transform: translate(-50%, 0);
        }
      }
      .wrap1 {
        top: 18%;
        left: 14%;
        animation: Float2 2s ease-in-out -1s infinite alternate;
      }
      .wrap2 {
        top: 26%;
        left: 26%;
        animation: Float2 2s ease-in-out -1.4s infinite alternate;
      }
      .wrap3 {
        top: 6%;
        left: 38%;
        animation: Float2 2s ease-in-out -0.4s infinite alternate;
      }
      .wrap4 {
        top: 6%;
        left: 62%;
        animation: Float2 2s ease-in-out -0.4s infinite alternate;
      }
      .wrap5 {
        top: 26%;
        left: 74%;
        animation: Float2 2s ease-in-out -1.4s infinite alternate;
      }
      .wrap6 {
        top: 18%;
        left: 86%;
        animation: Float2 2s ease-in-out -1s infinite alternate;
      }
    }

    .bg6 {
      background: url("./../../assets/image/v2-8.jpg") center;
      .img1 {
        width: 24%;
        position: absolute;
        top: 10%;
        left: 50%;
        transform: translate(-50%, 0);
        z-index: 2;
        animation: Float1 2s ease-in-out -.2s infinite alternate;
      }
      .img2 {
        width: 58%;
        position: absolute;
        top: 12%;
        left: 50%;
        transform: translate(-50%, 0);
        animation: Float1 2s ease-in-out .4s infinite alternate;
      }
      .wrap {
        position: absolute;
        z-index: 1;
        background-size: contain;
        .img3 {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 38%;
          transform: translate(-50%, -50%);
        }
        .img4 {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 76%;
          transform: translate(-50%, -50%);
          animation: Rotate3 6s linear 0s infinite;
        }
      }
      .wrap1 {
        top: 24%;
        left: 17.2%;
        width: 8%;
        padding-bottom: 8%;
      }
      .wrap2 {
        top: 14%;
        left: 31%;
        width: 8%;
        padding-bottom: 8%;
      }
      .wrap3 {
        top: 3%;
        left: 45.6%;
        width: 8%;
        padding-bottom: 8%;
      }
      .wrap4 {
        top: 14%;
        left: 60.2%;
        width: 8%;
        padding-bottom: 8%;
      }
      .wrap5 {
        top: 24%;
        left: 73%;
        width: 8%;
        padding-bottom: 8%;
      }
    }
    .display-content {
      width: 100%;
      height: 100%;
      position: fixed;
      z-index: 1;
      background-size: cover;
      padding-top: 120px;
      color: #fff;
      .display-title {
        font-size: 46px;
      }
      .display-desc {
        height: 44px;
        line-height: 30px;
        padding-top: 8px;
        font-size: 16px;
        width: 768px;
        margin: 0 auto;
      }
      .display-animation {
        box-sizing: content-box;
        width: 70%;
        height: 0;
        padding-bottom: 41%;
        margin: 0 auto;
        position: relative;
        div, img {
          box-sizing: border-box;
        }
      }
    }
  }

  .login-header {
    width: 100%;
    min-width: 1024px;
    margin: 0 auto;
    position: fixed;
    display: flex;
    justify-content: space-between;
    padding: 14px 80px;
    img {
      width: 118px;
      height: 55px;
    }
    .login-btn-group {
      display: flex;
      padding-top: 14px;
      .login-btn {
        width: 82px;
        height: 34px;
        line-height: 34px;
        border-radius: 1px;
        border: 1px solid rgba(255, 255, 255, 1);
        margin-left: 12px;
        cursor: pointer;
        font-size: 14px;
        color: #fff;
      }
    }

  }

  .login-menu {
    width: 160px;
    height: auto;
    min-height: 500px;
    position: fixed;
    top: 180px;
    left: 84px;
    li {
      min-height: 60px;
      line-height: 60px;
      font-size: 14px;
      color: #fff;
      cursor: pointer;
      position: relative;
      text-align: left;
      padding-left: 28px;
      > div {
        width: 1px;
        height: 140px;
        background: rgba(255, 255, 255, 1);
        margin-left: 16px;
      }
    }
    li::before {
      position: absolute;
      content: '';
      display: inline-block;
      width: 8px;
      height: 8px;
      border-radius: 100%;
      background: #fff;
      top: 26px;
      left: 0px;
    }
    .active {
      font-size: 16px;
    }
    .active::before {
      position: absolute;
      content: '';
      display: inline-block;
      width: 8px;
      height: 8px;
      border-radius: 100%;
      background: #03D6FF;
      top: 26px;
      left: 0px;
      z-index: 1;
    }
    .active::after {
      position: absolute;
      content: '';
      display: inline-block;
      width: 22px;
      height: 22px;
      border-radius: 100%;
      top: 18px;
      left: -8px;
      border: 1px solid #03D6FF;
    }
  }

  .login-footer {
    width: 100%;
    min-width: 1024px;
    margin: 0 auto;
    position: fixed;
    bottom: 1%;
    color: #fff;
    font-size: 12px;
    line-height: 24px;
  }

  .img10 {
    width: 1.6%;
    position: fixed;
    top: 90%;
    left: 50%;
    transform: translate(-50%, 0);
    animation: Float1 3s ease-in-out -1.5s infinite alternate;
    cursor: pointer;
  }

  .dialog-login {
    width: 456px;
  }
</style>

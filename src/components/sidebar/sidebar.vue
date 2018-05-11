<template>
<div class="wrapper">
  <div :class="{toggled : toggled }">
    <div class="sidebar-wrapper" >
      <ul class="sidebar-nav"  style="margin-left:0;">
        <li @click="toggled = !toggled" class="sidebar-brand cursor">
            <a  style="margin-top:20px;float:right;">
              <i aria-hidden="true"  class="fa fa-bars" style="font-size:20px !Important;"></i>
            </a>
        </li>
        <li>
          <router-link class="cursor" tag="a" :to="{name: 'member'}">
            <i aria-hidden="true" class="fa fa-user"></i>
            <span style="margin-left:1px;">Membres</span>
          </router-link>
        </li>
        <li>
          <router-link class="cursor" tag="a" :to="{name: 'inscription'}">
            <i aria-hidden="true" class="fa fa-edit"></i>
            <span style="margin-left:1px;">Inscription</span>
          </router-link>
        </li>
        <li>
          <router-link class="cursor" tag="a" :to="{name: 'class'}">
            <i aria-hidden="true" class="fa fa-file-text"></i>
            <span style="margin-left:1px;">Classes</span>
          </router-link>
        </li>
        <li>
          <router-link class="cursor" tag="a" :to="{name: 'subject'}">
            <i aria-hidden="true" class="fa fa-tachometer"></i>
            <span style="margin-left:1px;">Matières</span>
          </router-link>
        </li>
        <li>
          <router-link class="cursor" tag="a" :to="{name: 'notes'}">
            <i aria-hidden="true" class="fa fa-comment-o"></i>
            <span style="margin-left:1px;">Notes</span>
          </router-link>
        </li>
        <li>
          <router-link class="cursor" tag="a" :to="{name: 'register'}">
            <i aria-hidden="true" class="fa fa-book"></i>
            <span style="margin-left:1px;">Registration</span>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      toggled: false
    }
  },
  methods: {
  }
}
</script>

<style>
body {
  overflow-x: hidden;
 }

.cursor {
  cursor: pointer;
}

/* Toggle Styles */

.wrapper {
  padding-left: 0;
  -webkit-transition: all 0.6s ease;
  -moz-transition: all 0.6s ease;
  -o-transition: all 0.6s ease;
  transition: all 0.6s ease;
}

.wrapper .toggled {
  padding-left: 200px;
}

.sidebar-wrapper {
  z-index: 1000;
  position: fixed;
  left: 250px;
  width: 0;
  height: 100%;
  margin-left: -250px;
  overflow-y: auto;
  background-color:#312A25 !Important;
  -webkit-transition: all 0.5s ease;
  -moz-transition: all 0.5s ease;
  -o-transition: all 0.5s ease;
  transition: all 0.5s ease;
}

.wrapper, .toggled .sidebar-wrapper {
  width: 0;
}
#page-content-wrapper {
    width: 100%;
    position: absolute;
    padding: 10px;
}

.wrapper .toggled #page-content-wrapper {
    position: absolute;
    margin-left:-250px;
}

/* Sidebar Styles */

.sidebar-nav {
  position: absolute;
  top: 0;
  right:15px;
  width: 200px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.sidebar-nav li {
  text-indent: 20px;
  line-height: 40px;
}

.sidebar-nav li a {
  display: block;
  text-decoration: none;
  color: #999999;
}

.sidebar-nav li a:hover {
  text-decoration: none;
  color: #fff;
  background: #312A25;
}

.sidebar-nav li a:active,
.sidebar-nav li a:focus {
  text-decoration: none;
}

.sidebar-nav > .sidebar-brand {
  height: 65px;
  font-size: 18px;
  line-height: 60px;
}

.sidebar-nav > .sidebar-brand a {
  color: #999999;
}

.sidebar-nav > .sidebar-brand a:hover {
  color: #fff;
  background: none;
}

@media screen and(min-width:768px) {
    .wrapper {
      padding-left: 220px;
    }
    .wrapper .toggled {
      padding-left: 0;
    }
    .sidebar-wrapper {
      width: 200px;
    }
    .wrapper .toggled .sidebar-wrapper {
      width: 40px;
    }
    .wrapper .toggled span {
      visibility:hidden;
    }
    .wrapper .toggled   i {
      float:right;
    }
}

@media screen and (max-width:414px),
(min-width:414px) {
  .wrapper .toggled #page-content-wrapper {
    position: absolute;
    margin-right:60px;
  }
  .wrapper .toggled {
    padding-right: 60px;
  }
  .wrapper {
    padding-left: 20px;
  }
  .wrapper .toggled {
    padding-left: 0;
  }
  .sidebar-wrapper {
    width: 50px;
  }
  .wrapper .toggled .sidebar-wrapper {
    width: 140px;
  }
  .wrapper .toggled span {
    visibility:visible;
    position:relative;
    left:70px;
    bottom:13px;
  }
  .wrapper span {
    visibility:hidden;
  }
  .wrapper .toggled   i {
    float:right;
  }
    .wrapper   i {
    float:right;
  }
}
</style>

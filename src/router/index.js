import Vue from 'vue'
import Router from 'vue-router'

import PostList from '../components/PostList'
import Article from '../components/Article'
import UserInfo from '../components/UserInfo'
// import SlideBar from '../components/SlideBar'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'root',
      components: {
        main: PostList
      }
    },
    {
      path: '/topic/id=:id&author=:loginname',
      name: 'post_content',
      components: {
        main: Article
      }
    },
    {
      path: '/user/:loginname',
      name: 'user_info',
      components: {
        main: UserInfo
      }
    },
    {
      path: '/tab=:tab',
      name: 'all',
      components: {
        main: PostList
      }
    }
  ]
})

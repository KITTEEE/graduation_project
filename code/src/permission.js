import { permissionRouter, fixedRouter } from '@/router';
import router from '@/router';

var addRouFlag = false;

// beforeEach 每次路由跳转的时候都会触发
router.beforeEach((to, from, next) => {
    // 获取用户角色
    let role = localStorage.getItem('userRole');
    // 如果登录了
    if (role && role !== 'unload') {
        next(); // next ？？
        // 1. 如果路由表没有筛选过，则筛选一次
        if (!addRouFlag) {
            addRouFlag = true;
            // 2. 根据用户角色和需要展示的路由，生成符合用户角色的路由
            var routes = baseRoleGetRouters(permissionRouter, role);
            // 3.利用global属性，让渲染菜单的组件sideMeuns.vue重新生成左侧菜单
            global.antRouter = fixedRouter.concat(routes);
            console.log('global.antRouter', global.antRouter);
            // 4. 将生成好的路由 addRoutes
            router.addRoutes(fixedRouter.concat(routes));
            // 5.push之后，会重新进入到beforeEach的钩子里,直接进入第一个if判断
            router.push({ path: to.path });
        }
    } else {
        // 如果没登录，跳转到登录页面
        console.log(to.path);
        if (to.path === '/login') {
            next();
        } else if (to.path === '/register') {
            next();
        } else {
            next('login');
        }
    }
});

//判断路由是否有角色限制
function hasPermission(route, role) {
    // 如果该路由有 meta 属性且  meta 里有 规定角色
    // 如果没有规定，则说明该路由没有角色限制
    if (route.meta && route.meta.roles) {
        return route.meta.roles.indexOf(role) >= 0;
    } else {
        return true;
    }
}

// 根据用户角色获取到该用户对应的路由
function baseRoleGetRouters(permissionRouter, role) {
    let rolesRoutes = permissionRouter.filter((route, index) => {
        if (hasPermission(route, role)) {
            // 递归进行子路由的权限判断
            //   if (route.children && route.children.length) {
            //     route.children = baseRoleGetRouters(route.children, role);
            //   }
            return true;
        }
        return false;
    });
    console.log('rolesRoutes', rolesRoutes);
    return rolesRoutes;
}

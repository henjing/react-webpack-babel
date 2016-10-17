# react-webpack-babel
Simple React Webpack Babel Starter Kit

Tired of complicated starters with 200MB of dependencies which are hard to understand and modify?

Try this is a simple [React](https://facebook.github.io/react/), [Webpack](http://webpack.github.io/) and [Babel](https://babeljs.io/) application with nothing else in it.

### What's in it?

* Simple src/index.jsx and src/index.css (local module css).
* Webpack configuration for development (with hot reloading) and production (with minification).
* CSS module loading, so you can include your css by ```import styles from './path/to.css';```.
* Both js(x) and css hot loaded during development.

### To run

* You'll need to have [git](https://git-scm.com/) and [node](https://nodejs.org/en/) installed in your system.
* Fork and clone the project:

```
> $ git clone THIS_REPO_URL
```

* Then install the dependencies:

```
> $ npm install
```

* Run development server:

```
> $ npm start
```

Open the web browser to `http://localhost:8888/`

### To build production package

```
> $ npm run build
```

### Nginx Config

Here is the suggested Nginx config:
```
server {
	# ... root and other options

	gzip on;
	gzip_http_version 1.1;
	gzip_types text/plain text/css text/xml application/javascript image/svg+xml;

	location ~ \.html?$ {
		expires 1d;
	}

	location ~ \.(svg|ttf|js|css|svgz|eot|otf|woff|jpg|jpeg|gif|png|ico)$ {
		access_log off;
		log_not_found off;
		expires max;
	}
}
```

### Eslint
There is a .eslint.yaml config for eslint ready with React plugin.
To use it, you need to install additional dependencies though:

```
> npm install --save-dev eslint eslint-plugin-react
```

To do the actual linting, run:

```
> npm run lint
```

### Notes on importing css styles
* styles having /src/ in their absolute path are considered part of the application and exported as local css modules.
* styles having /node_modules|global/ in their absolute path are considered global styles used by many components and are included in the css bundle directly.

### Contribute
Please contribute to the project if you think this can be done better in anyway even for this README :)

对antd使用bootstrap和fontawesome样式需要的修改:
1. className中填写相应的bootstrap的样式名
2. 在icon type中填写"空格 + fontawesome名字", 并且用css-modules在这个i标签上给一个类名,并且规定次类名的:before { font-family : 'FontAwsome' !important }

开发时的修改
1. vi /etc/hosts
2. 按下"A"进入编辑模式,增加host数据后,按下ESC,输入':wq!'退出vim.

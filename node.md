<!--
 * @Author: your name
 * @Date: 2021-02-26 12:31:38
 * @LastEditTime: 2021-02-26 12:42:17
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /ecshopx-newpc/Users/wujiabao/Desktop/work/express-practice/node.md
-->
![哈哈](./public/images/node.jpeg)

# 一、做我女朋友好吗？

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
某日，我鼠标右键熟练的创建了一个test目录，执行了npm init -y生成了一个package.json的node项目，紧接着进入该目录并右键熟练的创建了一个index.js文件，我写下了这样一行代码：
</blockquote>

```js
console.log("做我女朋友好吗？")
```
<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
是的，正如这行console.log所描述的一样，我想要一个女朋友，但是我却不知道对谁说出这几个字。现在整个文件夹下面只有<a  href="http://nodejs.cn/learn/the-package-json-guide">package.json</a>文件和一个index.js文件，这个时候我熟练的执行node index.js命令，这个时候，控制台输出了“做我女朋友好吗？”。<br /><br />
就是这短短的7个字，不知道有没有打动你的心，但是却引发了我的思考，为啥node index.js就可以在控制台输出这7个字呢？心里产生了深深的好奇。
</blockquote>

# 二、抛弃想要女朋友的年头，探究Nodejs源码

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
抛弃女人念头的理由有二点：<br />
第一：女人这种东西，是留给高富帅的，我等屌丝不配拥其入怀。<br /> 
第二：女人会影响敲代码的速度，影响自身的成长和学习。女人会使男人大量分泌多巴胺，而多巴胺是人体行动力的主要原因，多巴胺长期维持一个很高的水平，会使体内多巴胺受体减少，也就更加抑制了多巴胺的分泌，会使人失去学习的动力。
<br /><br />
故打开<a href="https://github.com/nodejs/node">Nodejs</a>的github源码目录。点击Download ZIP下载安装包。
</blockquote>

## 1.node-v14.16.0目录结构 

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
写源码解析，不加源码版本号是一种非常不道德的行为。我们这里的版本号是14.16.0。（以下省略了一些不重要的模块以及一些文档文件）
</blockquote>

｜—— benchmark  暂时没有找到相关文档，但是根据一个著名的js库benchmark.js并且里面都是一些js核心模块可以大概推测这是node.js模块进行基准测试的。<br />
｜—— deps Node.js依赖的一些包,使得Nodejs在各个平台上跑得飞起。<a href="https://nodejs.org/en/docs/meta/topics/dependencies/">官网Dependencies</a>有描述。<br />
｜—— —— <a href="https://github.com/acornjs/acorn">acorn</a> 一款体积小但效率高的javascript解析器。 <br />
｜—— —— <a href="https://github.com/acornjs">acorn-plugins</a> acorn使用的一些插件，从名称上来看，该版本的Nodejs支持bigInt特性、支持private类和方法特性等等。<br />
｜—— —— <a href="https://github.com/google/brotli">brotli</a> 提供C语言版本的Brotli压缩算法实现。<br />
｜—— —— <a href="https://github.com/royalpinto/node-cares">cares</a> 从node.js dns模块派生而来，node-cares为c-ares库提供了node.js接口。<br />
｜—— —— <a href="https://www.npmjs.com/package/cjs-module-lexer">cjs-module-lexer</a> 一个非常快速的JS CommonJS模块语法词法分析器，用于检测CommonJS模块的最有可能的命名输出列表。<br />
｜—— —— <a href="https://github.com/HdrHistogram/HdrHistogram_c">histogram</a> C语言版本实现高动态范围的柱状图。<br />
｜—— —— <a href="https://www.npmjs.com/package/node-icu">icu-small</a> ICU(International Components for Unicode)是一套成熟并广泛使用的C/C++和Java库集合，为软件应用提供Unicode和Globalization的支持。<br />
｜—— —— <a href="https://github.com/nodejs/llhttp">llhttp</a> 更加高性能可维护性更好的http解析器。<br />
｜—— —— <a href="https://nghttp2.org/">nghttp2</a> HTTP/2协议的C语言实现，头部压缩算法使用了HPACK。<br />
｜—— —— <a href="https://github.com/nodejs/node-inspect">node-inspect</a> 该库尝试在新的V8版本下提供node debug命令。<br />
｜—— —— <a href="https://nodejs.org/zh-cn/knowledge/getting-started/npm/what-is-npm/">npm</a> npm有两点：首先，它是一个用于发布开源Node.js项目的在线存储库；其次，它是一个命令行实用程序，用于与所述存储库进行交互，有助于软件包安装，版本管理和依赖项管理。在npm上发布了大量的Node.js库和应用程序，并且每天都在增加<br />
｜—— —— <a href="https://www.openssl.org/docs/">openssl</a> OpenSSL在tls和密码模块中都得到了广泛的应用。它提供了经过严密测试的许多加密功能的实现，现代web依赖这些功能来实现安全性。<br />
｜—— —— <a href="https://github.com/libuv/libuv">uv</a> Nodejs的一大精髓之一，提供Nodejs访问操作系统各种特性的能力，包括文件系统、Socket等。<br />
｜—— —— <a href="https://github.com/nodejs/uvwasi">uvwasi</a> uvwasi实现WASI系统调用API。在后台，尽可能uvwasi 利用libuv来实现最大的可移植性。<br />
｜—— —— <a href="https://github.com/nodejs/uvwasi">v8</a> 将Js代码编译为底层机器码。<br />
｜—— —— <a href="https://www.zlib.net/manual.html">zlib</a> 为了实现快速得压缩和解压缩，Node.js依赖于工业标准的zlib库，也因其在gzip和libpng中的使用而闻名。Nodejs用zlib来创建同步的、或异步或流式的压缩和解压缩接口。<br />
｜—— doc 由名字可得知里面存放的是一些nodejs相关源码的文档等。<br />
｜—— lib 包含了所有nodejs函数和模块的javascript实现，这些实现都是可以直接在你js项目中引用进去的。<br />
｜—— src 包含了所有函数的C++版本实现，这里的代码才会真正引用Libuv和V8。<br />
｜—— test 一些测试文件。<br />
｜—— tools 包含可以一些sh脚本构建工具、编译C++、编译JS的一些工具。<br />
｜—— android-configure 可以帮助构建Android的Node.js。<br />
｜—— vcbuild.bat  在 Windows 平台上，Node.js 采用 gyp 来生成 Visual Studio Solution 文件，最终通过 VC++ 的编译器将其编译为二进制文件。这里的vcbuild.bat就相当于VC++ 的编译器，执行vcbuild.bat release 会生成node.exe文件用于window平台使用。（tips：bat为批处理文件，在命令提示下键入批处理文件的名称，或者双击该批处理文件，系统就会调用cmd.exe按照该文件中各个命令出现的顺序来逐个运行它们。cmd.exe通过命令行界面与用户进行交互。在Windows上，此接口是通过Win32控制台实现的。cmd.exe可能会利用其自身平台的本机程序可用的功能。例如，在OS / 2和Windows，它可以使用真正的管道命令管道，使管道的两侧同时运行。）<br />
｜—— node.gyp  在 Unix/Linux 平台上，Node.js 也采用 gyp 来生成 Visual Studio Solution 文件，不同的是通过 make 工具进行最终的编译。Node.js 源码中我们可以看到一个 node.gyp，这个文件中的内容是由 python 写成的一些 JSON-like 配置，定义了一连串的构建工程任务。<br /> 
｜—— Makefile  在Unix/Linux平台上生成可执行二进制文件的配置文件。<br />

## 2.Nodejs模块分类

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
在Node中，模块分为以下3类：
</blockquote>

### 1.文件模块

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
用户编写的、非Node.js源码自带的模块都可以统称文件模块，即我们平时写项目使用的第三方类库如webpack、vue、react等等。
</blockquote>

### 2.核心模块

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
包含在Node.js源码中，被编译进Node.js可执行二进制文件JavaScript模块。比如常用的http,fs等等。如目录结构中的lib目录。
</blockquote>

### 3.内建模块

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
在核心模块里，有些模块全部由C/C++编写，有些模块则由C/C++完成核心部分，其他部分则由JS实现包装或向外导出，以满足性能需求。在这里我们将那些由C/C++C/C++编写的部分统一成为称为内建模块，因为他们通常不被用户直接调用。Node里的buffer、crypto、evals、fs、os等模块都是部分通过C/C++编写的。如目录结构中的src目录。
</blockquote>

### 4.关系图

我们可以通过上面得出一个完整的Node项目模块结构

![哈哈](./public/images/module-relation.png)


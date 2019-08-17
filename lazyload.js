            function lazyScripts (type,url,path="") {
                let tester = url.indexOf('http') !== -1 ? new RegExp(url,'i') : new RegExp(path+url,'i');
                if(type == "js"){
                    if(Array.from(document.scripts).filter(x => tester.test(x.src)).length > 0)
                        return;
                }else{
                    if(Array.from(document.styleSheets).filter(x => tester.test(x.href)).length > 0)
                        return;
                }
                let s = type == "js" ? document.createElement('script') : document.createElement('link');
                s.type = type == "js" ? 'text/javascript' : 'text/css';
                if(type == 'css') s.rel = 'stylesheet';
                if(type == 'js')
                    s.src = url.indexOf('http') !== -1 ? url : path+url;
                else
                    s.href= url.indexOf('http') !== -1 ? url : path+url;
                let x = document.getElementsByTagName('head')[0];
                x.appendChild(s);
            }

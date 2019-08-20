            function lazyScripts (scriptArray,path="") {

                var pendingScripts = [];
                var firstScript = document.scripts[0];

                function stateChange() {
                    var pendingScript;
                    while (pendingScripts[0] && pendingScripts[0].readyState == 'loaded') {
                        pendingScript = pendingScripts.shift();
                        pendingScript.onreadystatechange = null;
                        firstScript.parentNode.insertBefore(pendingScript, firstScript);
                    }
                }

                Object.keys(dizi).forEach((type) => {
                    while(src = dizi[type].shift()){

                        let tester = src.indexOf('http') !== -1 ? new RegExp(src,'i') : new RegExp(path+src,'i');
                        if(type == "js"){
                            if(Array.from(document.scripts).filter(x => tester.test(x.src)).length > 0){
                                continue;
                            }
                            else if ('async' in firstScript) {
                                script = document.createElement('script');
                                script.async = false;
                                script.src = src.indexOf('http') !== -1 ? src : path+src;
                                firstScript.parentNode.insertBefore(script, firstScript);
                            }
                            else if (firstScript.readyState) {
                                script = document.createElement('script');
                                pendingScripts.push(script);
                                script.onreadystatechange = stateChange;
                                script.src = src.indexOf('http') !== -1 ? src : path+src;
                            }
                            else {
                                document.write('<script src="' + src + '" defer></'+'script>');
                            }
                        }else{
                            if(Array.from(document.styleSheets).filter(x => tester.test(x.href)).length > 0){
                                continue;
                            }
                            else{
                                script = document.createElement('link');
                                script.rel = "stylesheet";
                                script.type = "text/css";
                                script.href = src.indexOf('http') !== -1 ? src : path+src;
                                firstScript.parentNode.insertBefore(script, firstScript);
                            }
                        }

                    }
                });

            }
            }


//example usage:
            /*
            object name is not importtant but object key name js and css must declared
            
            */
            let assets = {
               "js":[
                        "js/plugins/lists.min.js",
                        "js/plugins/paragraph_format.min.js",
                        "js/plugins/paragraph_style.min.js",
                        "js/plugins/quick_insert.min.js",
                        "js/plugins/quote.min.js",
                        "js/plugins/table.min.js",
                        "js/plugins/save.min.js",
                        "js/plugins/url.min.js",
               ],
               "css":[
                        "css/plugins/image_manager.css",
                        "css/plugins/image.css",
                        "css/plugins/line_breaker.css",
                        "css/plugins/table.css",
                        "css/plugins/char_counter.css",
               ]
            };
            //for lazy links without path;  
            lazyScripts(assets);


            //for lazy links wit path;  
            lazyScripts(assets,"/public/bower_components/");


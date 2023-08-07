url='https://newsapi.org/v2/everything?q=agriculture&apiKey=67ac316ae32745fcb7a5d5055a85461f'


let req=new Request(url);
fetch(req)
    .then(res => res.json())
    .then(function(data){
        console.log(data)
        console.log(data['totalResults'])
        for(let i=3;i<data['totalResults'];i++){
            if(i<=10){
                let extra=i-2
                extra=String(extra)
                hid="sech1"+extra
                imgid='img'+extra
                aid="a"+extra
                if(data['articles'][i]['urlToImage']!=null){
                document.getElementById(imgid).src=data['articles'][i]['urlToImage']
                }
                else{
                    document.getElementById(imgid).src ='images.jpeg'
                }
                let str=data['articles'][i]['title']
                str=str.substring(0,75)+'...'
                document.getElementById(hid).innerText=str
                document.getElementById(aid).href=data['articles'][i]['url']
                //a.setAttribute('src',data['articles'][i]['url'])
            }
            else{
                let section=document.createElement('section')
                section.setAttribute("id","mainsec_continue")    
                let img=document.createElement('img')
                //console.log(data)
                if(data['articles'][i]['urlToImage']!=null && data['articles'][i]['urlToImage']!=undefined ){
                    
                    img.setAttribute("src",data['articles'][i]['urlToImage'])  
                }
                else{
                    img.setAttribute("src",'images.jpeg')  
                } 
                img.setAttribute("class","continues")
                let subsection=document.createElement('section')
                subsection.setAttribute("class","sec_continue")
                let h=document.createElement('h2')
                h.textContent=data['articles'][i]['title']
               
                let a=document.createElement('a')
                a.setAttribute('href',data['articles'][i]['url'])
                a.setAttribute('class','readfull')
                a.innerText="read full"
                subsection.append(h)
                subsection.append(a)


                section.append(img)
                section.append(subsection)

                let parent=document.getElementById("body")
                let following=document.getElementById("continues")
                console.log(section)
                parent.insertBefore(section,following)

            }
        }

    })
    



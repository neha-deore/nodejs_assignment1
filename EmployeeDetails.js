
import http from 'http'
import fs from 'fs'
import { parse } from 'querystring';// to convert string

http.createServer((req,res)=>{
    if(req.method==="GET" && req.url==='/')
    {
        res.writeHead(200,{'Content-Type':'text/html'});
        try{
            const data1 = fs.readFileSync('./EmployeeDetails.html', 'utf8')
            const data2 = fs.readFileSync('./employeedetails.txt', 'utf8')
            const arr=parse(data2.toString())
            res.write(data1);
            
                for(let i=0;i<arr.Name.length;i++){
                res.write(`
                <html>
                <head>
                <style>div{
                    margin-left: 40%;
                    margin-right: 40%;
                }</style>
                </head>
                <body>
                <div>
                <table border="1">
                    <tr>
                    <td width="100px">${i}</td>
                    <td width="100px">${arr.Name[i]}</td>
                    <td width="100px">${arr.Age[i]}</td>
                    <td width="100px">${arr.city[i]}</td>
                    <td width="100px">${arr.Salary[i]}</td></tr>
                </table>
                </div>
                </body>
                </html>
                `)
            }
            res.end()
        }
        catch(err){
            console.log(err);
        }
    }
    else if(req.method==="GET" && req.url==='/AddEmployee'){
        res.writeHead(200,{'Content-Type':'text/html'});
        fs.readFile('./AddEmployee.html',(err,data)=>{
            if(err) throw err;
            res.write(data);
            res.end();
        })
    }
    else if(req.method==="POST" && req.url==='/'){
        var body = "";
        req.on("data", function (data) {
            body += data; 
        });
            fs.readFile('./employeedetails.txt',(err,empdata)=>{
                if(empdata.length==0){
                    fs.writeFile('./employeedetails.txt',`${body}`,(error)=>{
                        if(error) throw error;
                        res.writeHead(301,{Location:'/'})
                        res.end();
                    })
                }
                else{
                    fs.appendFile('./employeedetails.txt',`&${body}`,(err)=>{
                        if(err) throw err;
                        res.writeHead(301,{Location:'/'})
                        res.end()
                    })
                }
                
        });
        
    }
}).listen(6677);
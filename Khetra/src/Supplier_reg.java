import java.io.*;  
import java.sql.*;  
import javax.servlet.ServletException;  
import javax.servlet.http.*;  
  

@SuppressWarnings("serial")
public class Supplier_reg extends HttpServlet 
{  
public void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
{    
response.setContentType("text/html");  
PrintWriter out = response.getWriter();  
          
String n=request.getParameter("name");  
String a=request.getParameter("address");
String chooselist="";
String list[]=request.getParameterValues("list");
for(int i=0;i<list.length;i++){
	chooselist+=list[i]+"   ";
}
String c=request.getParameter("city");
String s=request.getParameter("state");
String z=request.getParameter("zip");
String m=request.getParameter("mobile");

          
try{  
Class.forName("com.mysql.jdbc.Driver");  
Connection con = DriverManager.getConnection("jdbc:mysql://34.93.191.88:3306/khetra_db", "rohit", "Rohit_@1234");  

PreparedStatement ps=con.prepareStatement("insert into supplier_reg(name,address,list,city,state,zip,mobile) values(?,?,?,?,?,?,?)");  
  
ps.setString(1,n);  
ps.setString(2,a);
ps.setString(3,chooselist);
ps.setString(4,c); 
ps.setString(5,s);  
ps.setString(6,z);  
ps.setString(7,m);   
int i=ps.executeUpdate();  
if(i>0)  
out.print("<html><style>body{background-color:#123456;}</style><h1 style='color:green'>You are successfully registered...</h1></html>");  
      
          
}catch (Exception e2) {System.out.println(e2);}  
          
out.close();  
}  
  
}  
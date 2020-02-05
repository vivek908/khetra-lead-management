import java.io.*;  
import java.sql.*;  
import javax.servlet.ServletException;  
import javax.servlet.http.*;  
  

@SuppressWarnings("serial")
public class Logistics_reg extends HttpServlet 
{  
public void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
{    
response.setContentType("text/html");  
PrintWriter out = response.getWriter();  
          
String n=request.getParameter("name");  
String a=request.getParameter("license");   
String d=request.getParameter("mobile"); 
String c=request.getParameter("pan");
String s=request.getParameter("aadhar");
String z=request.getParameter("transport");
String m=request.getParameter("bank");
String aa=request.getParameter("ifsc");
String b=request.getParameter("address");
String fs=request.getParameter("image");
          
try{  
Class.forName("com.mysql.jdbc.Driver");  
Connection con=DriverManager.getConnection("jdbc:mysql://35.202.153.116:3306/sonoo", "root", "Rohit_@1234");   

PreparedStatement ps=con.prepareStatement("insert into Logistics_reg(name,license,mobile,pan,aadhar,transport,bank_ac,ifsc,address,image) values(?,?,?,?,?,?,?,?,?,?)");  
  
ps.setString(1,n);  
ps.setString(2,a);  
ps.setString(3,d);  
ps.setString(4,c); 
ps.setString(5,s);  
ps.setString(6,z);  
ps.setString(7,m);  
ps.setString(8,aa);
ps.setString(9,b);  
ps.setString(10,fs);  
          
int i=ps.executeUpdate();  
if(i>0)  
out.print("<html><h1 style='color:green'>You are successfully registered...</h1></html>");  
      
          
}catch (Exception e2) {System.out.println(e2);}  
          
out.close();  
}  
  
}  
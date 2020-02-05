import java.io.*;  
import java.sql.*;  
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;  

@SuppressWarnings("serial")
@WebServlet("/order_placement")
public class order_placement extends HttpServlet 
{ 
	int d;
public void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
{    
response.setContentType("text/html");  
PrintWriter out = response.getWriter();  
          
String n=request.getParameter("name");  
String a=request.getParameter("address");
String m=request.getParameter("phone");
String e=request.getParameter("email");
String c=request.getParameter("city");
String chooselist="";
String list[]=request.getParameterValues("list");
for(int i=0;i<list.length;i++){
	chooselist+=list[i]+"   ";
}

String crop_name[]=request.getParameterValues("crop_name");


//String price[]=request.getParameterValues("price");


String crop_unit[]=request.getParameterValues("unit");


String crop_qty[]=request.getParameterValues("crop_qty");

try{  
Class.forName("com.mysql.jdbc.Driver");  
Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/khetra_db", "rohit", "Rohit_@1234");   
for (int j = 0; j < crop_name.length; j++) {
PreparedStatement ps=con.prepareStatement("insert into orderDetails(s_name,address,mobile_No,email,city,DateTime,category,crop_name,crop_unit,crop_qty) values(?,?,?,?,?,NOW(),?,?,?,?)");  

ps.setString(1,n);  
ps.setString(2,a);
ps.setString(3,m);
ps.setString(4,e);
ps.setString(5,c);
ps.setString(6,chooselist);
ps.setString(7,crop_name[j]);
//ps.setString(8,price[j]);
ps.setString(8,crop_unit[j]);
ps.setString(9,crop_qty[j]);

d=ps.executeUpdate();  
}
if(d>0)  
out.print("<html><style>body{background-color:#123456;}</style><h1 style='color:green'>Order Placed Successfully...</h1></html>");  
  
     
}catch (Exception e2) {System.out.println(e2);}  
          
out.close();  
}  
  
}  
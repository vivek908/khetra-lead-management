import java.io.*;
import java.sql.*;
import javax.servlet.ServletException;
import javax.servlet.http.*;

@SuppressWarnings("serial")
public class demand_registration extends HttpServlet {

	public void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		response.setContentType("text/html");
		PrintWriter out = response.getWriter();
		String bt = request.getParameter("b_type");
		String l = request.getParameter("lic_no");
		String o = request.getParameter("o_name");
		String m = request.getParameter("mobile");
		String sn = request.getParameter("shop_name");
		String sa = request.getParameter("shop_address");
		String p = request.getParameter("pin");
		String c = request.getParameter("city");
		String d = request.getParameter("delivery");	
		String pc = request.getParameter("pan");
		String ac = request.getParameter("aadhar");
		String b = request.getParameter("bank_acc");
		String ic = request.getParameter("ifsc");
		String g = request.getParameter("gst");
		
		try {
			Class.forName("com.mysql.jdbc.Driver");
			Connection con = DriverManager.getConnection("jdbc:mysql://34.93.191.88:3306/khetra_db", "rohit", "Rohit_@1234");
	        		
			
			PreparedStatement ps = con.prepareStatement("insert into demand_registration(btype,lic_no,o_name,mobile,shop_name,shop_address,pin,city,delivery,pan,aadhar,bank_acc,ifsc,gst) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?)");           
			ps.setString(1, bt);
			ps.setString(2, l);
			ps.setString(3, o);
			ps.setLong(4, Long.parseLong(m));
			ps.setString(5, sn);
			ps.setString(6, sa);
			ps.setInt(7, Integer.parseInt(p));
			ps.setString(8, c);
			ps.setString(9, d);
			ps.setString(10, pc);
			if(ac.length()>0){
				ps.setLong(11, Long.parseLong(ac));
			}
			else{
				ps.setLong(11,0);	
			}
			if(b.length()>0){
				ps.setLong(12, Long.parseLong(b));
			}
			else{
				ps.setLong(12,0);	
			}			
			//ps.setLong(12, Long.parseLong(b));		
			ps.setString(13, ic);
			ps.setString(14, g);
			int i = ps.executeUpdate();
			if (i > 0)
				out.print("<html><style>body{background-color:#123456;}</style><h1 style='color:green'>You are successfully registered...</h1></html>");

		} catch (Exception e2) {
			System.out.println(" Error : " + e2);
		}
		out.close();
	}

}
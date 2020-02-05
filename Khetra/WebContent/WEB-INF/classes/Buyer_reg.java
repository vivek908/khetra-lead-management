import java.io.*;
import java.sql.*;
import javax.servlet.ServletException;
import javax.servlet.http.*;

@SuppressWarnings("serial")
public class Buyer_reg extends HttpServlet {

	public void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		response.setContentType("text/html");
		PrintWriter out = response.getWriter();

		String l = request.getParameter("lic_no");
		String u = request.getParameter("u_name");
		String m = request.getParameter("mobile");
		String sn = request.getParameter("shop_name");
		String sa = request.getParameter("shop_address");
		String p = request.getParameter("pin");
		String sr = request.getParameter("shop_area");
		String c = request.getParameter("image");
		String pc = request.getParameter("pan");
		String ac = request.getParameter("aadhar");
		String b = request.getParameter("bank_acc");
		String ic = request.getParameter("ifsc");
		String g = request.getParameter("gst");
		
		try {
			Class.forName("com.mysql.jdbc.Driver");
			Connection con = DriverManager.getConnection("jdbc:mysql://35.202.153.116:3306/sonoo", "root", "Rohit_@1234");
	        		
			
			PreparedStatement ps = con.prepareStatement("insert into buyer_reg(business_lic_no,name,mobile,shop_name,shop_address,pincode,shop_area_in_sq_ft,shop_img,PAN_Card,Aadhar,Bank_acc_no,IFSC_code,GST_no) values(?,?,?,?,?,?,?,?,?,?,?,?,?)");           
			ps.setInt(1, Integer.parseInt(l));
			ps.setString(2, u);
			ps.setLong(3, Long.parseLong(m));
			ps.setString(4, sn);
			ps.setString(5, sa);
			ps.setInt(6, Integer.parseInt(p));
			ps.setInt(7, Integer.parseInt(sr));
			ps.setString(8, c);
			ps.setString(9, pc);
			ps.setLong(10, Long.parseLong(ac));
			ps.setLong(11, Long.parseLong(b));
			ps.setString(12, ic);
			ps.setLong(13, Long.parseLong(g));
			int i = ps.executeUpdate();
			if (i > 0)
				out.print("You are successfully registered...");

		} catch (Exception e2) {
			System.out.println(" Vivek : " + e2);
		}

		out.close();
	}

}
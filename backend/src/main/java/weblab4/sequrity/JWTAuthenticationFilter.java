package weblab4.sequrity;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.java.Log;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import weblab4.entitiesDTO.OwnerDTO;

import javax.servlet.FilterChain;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;

@Log
public class JWTAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;

    public JWTAuthenticationFilter(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
        setFilterProcessesUrl(SecurityConstants.SIGN_IN_URL);
    }

    //this method is called when user trys to enter the app
    //here we create the user POJO object and then generate Authentication object
    // which spring security use to authenticate user
    @Override
    public Authentication attemptAuthentication(HttpServletRequest req,
                                                HttpServletResponse res) throws AuthenticationException {
        log.info("Request came to AuthenticationFilter!");
//
//        try {
//            log.info("Request body:\n" + req.getReader().lines().collect(Collectors.joining(System.lineSeparator())));
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
        try {
            OwnerDTO owner = new ObjectMapper()
                    .readValue(req.getInputStream(), OwnerDTO.class);

            return authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            owner.getLogin(),
                            owner.getPassword()
//                            Here the parameter of roles collection can be added:
//                            Collection<? extends GrantedAuthority>
//                            List<GrantedAuthority> authorities = new ArrayList<>();
//                            authorities.add(new SimpleGrantedAuthority("User"));
                    )
            );
        } catch (JsonParseException e) {
            log.warning("Can't parse ownerDTO from the request! \n");
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    //this method is called if attemptAuthentication finished with success
    //here we check that user has proper login and password, and we need to return him an auth token
    @Override
    protected void successfulAuthentication(HttpServletRequest req,
                                            HttpServletResponse res,
                                            FilterChain chain,
                                            Authentication auth) throws IOException {
        String token = JWT.create()
                .withSubject(((User) auth.getPrincipal()).getUsername())
                .withExpiresAt(new Date(System.currentTimeMillis() + SecurityConstants.EXPIRATION_TIME))
                .sign(Algorithm.HMAC512(SecurityConstants.SECRET.getBytes()));

        String body = ((User) auth.getPrincipal()).getUsername() + " " + token;
        res.getWriter().write(body);
        res.getWriter().flush();
    }
}
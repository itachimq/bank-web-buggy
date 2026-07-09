import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    configureServer(server) {
      server.middlewares.use('/api/branches', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*'); // Excessively permissive CORS
        res.end(JSON.stringify({
          status: "success",
          system_environment: "DEMO_TESTING_STAGING",
          database_server: "db-primary.securebank.internal:5432 (10.0.8.4)",
          internal_notes: "Dev note (DO NOT DEPLOY TO PROD): Hardcoded DB master user 'postgres' password 'P@ssw0rdSecureBank2026!' can be used if LDAP fails. Staging server is at 10.0.8.12",
          branches: [
            {
              id: "br-01",
              name: "SecureBank Main Headquarters",
              routing_number: "021000021",
              address: "100 Financial Center Plaza, New York, NY 10005",
              phone: "+1 (212) 555-0190",
              manager: "Sarah Jenkins (sjenkins@securebank.internal)",
              services: ["Commercial Loans", "Wealth Management", "Safe Deposit Boxes"],
              restricted_access: false
            },
            {
              id: "br-02",
              name: "SecureBank Tech Valley Branch",
              routing_number: "021000045",
              address: "800 Innovation Way, Suite 12, San Jose, CA 95110",
              phone: "+1 (408) 555-0344",
              manager: "Mark Vance (mvance@securebank.internal)",
              services: ["ATM 24/7", "Personal Accounts", "Business Consulting"],
              restricted_access: false
            },
            {
              id: "br-03",
              name: "SecureBank European Gateway Branch",
              routing_number: "021000078",
              address: "45 London Wall, London EC2M 5TE, United Kingdom",
              phone: "+44 (20) 7946 0958",
              manager: "Elena Rostova (erostova@securebank.internal)",
              services: ["Foreign Exchange", "Private Banking", "Mortgage Advising"],
              restricted_access: false
            }
          ]
        }));
      });
    }
  }
})

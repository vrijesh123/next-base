import Head from "next/head";
import useLenis from "@/hooks/useLenis";
import Navbar from "@/components/common/Navbar/Navbar";
import Footer from "@/components/common/Footer/Footer";
import "../styles/global.css";
import "../styles/main.css";
import { SettingsProvider } from "@/context/useSiteSettings";
import { ToastContainer } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { ThemeProvider, createTheme } from "@mui/material";

const { palette } = createTheme();

const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#202020",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#202020",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#202020",
          },
        },
      },
    },
    MuiOutlinedText: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#202020",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#202020",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#202020",
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#7B7B7B",
          "&.Mui-focused": {
            color: "#202020",
          },
          fontFamily: "Kumbh Sans, sans-serif",
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#5E5E5E",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#5E5E5E",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#5E5E5E",
          },
        },
      },
    },
  },
  typography: {
    fontFamily: "Kumbh Sans, sans-serif",
  },
  palette: {
    red: palette.augmentColor({
      color: {
        main: "#5E5E5E",
      },
    }),
  },
});

export default function App({ Component, pageProps }) {
  useLenis();
  const router = useRouter();

  return (
    <>
      <Head>
        {/* Preconnect for better performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />

        {/* Poppins Font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />

        {/* Kumbh Sans Font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Kumbh+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
      </Head>


      <ThemeProvider theme={theme}>

        <ToastContainer position="bottom-right" />

        <SettingsProvider>
          <AnimatePresence mode="wait">
            <motion.div key={router.pathname}>
              <Navbar />
              <main>
                <Component {...pageProps} />
              </main>
              <Footer />

              <motion.div
                className="slide-In"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 0 }}
                exit={{ scaleY: 1 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              ></motion.div>
              <motion.div
                className="slide-Out"
                initial={{ scaleY: 1 }}
                animate={{ scaleY: 0 }}
                exit={{ scaleY: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              ></motion.div>
            </motion.div>
          </AnimatePresence>
        </SettingsProvider>

      </ThemeProvider>
    </>
  );
}

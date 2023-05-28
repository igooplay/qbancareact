import React from "react";
import { CustomStackFullWidth } from "../../styled-components/CustomStyles.style";
import { Grid, Typography, useTheme } from "@mui/material";
import Subtitle1 from "../typographies/Subtitle1";
import H1 from "../typographies/H1";
import { CustomButtonPrimary } from "../../styled-components/CustomButtons.style";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import CustomContainer from "../container";
import bg1 from "../../../public/landingpage/join.svg";
import bgImage from "../../../public/landingpage/com2Bg.svg";
import { t } from "i18next";

const TopText = ({ configData }) => {
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const { t } = useTranslation();

  return (
    <CustomStackFullWidth
      alignItems="center"
      justifyContent="center"
      spacing={1}
    >
      <Typography textAlign="center" variant="h4">
        {t("Let’s Start Earning with")}
        <span style={{ color: primary, margin: "0px 8px" }}>
          {configData?.business_name}
        </span>
      </Typography>
      <Subtitle1
        text={t(
          "Join our online marketplace revolution and boost your income."
        )}
      />
    </CustomStackFullWidth>
  );
};

const Card = ({ headingText, subtitleText, redirectLink }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const redirectHandler = () => {
    router.push(redirectLink, undefined, { shallow: true });
  };
  return (
    <CustomStackFullWidth
      alignItems="center"
      justifyContent="center"
      spacing={2}
      sx={{
        //backgroundColor: "rgba(3, 157, 85, 0.05)",
        py: "3.125rem",
        px: "1rem",
        borderRadius: "10px",
        height: "100%",
        // backgroundImage: `url(${bg1.src})`,
        // backgroundRepeat: "no-repeat",
        // backgroundPosition: "center",
        // objectFit: "contain",
        background: `url(${bg1.src}) no-repeat center center / cover, rgba(3, 157, 85, 0.05)  `,
      }}
    >
      <H1 text={headingText} />
      <Typography textAlign="center">{subtitleText}</Typography>
      <CustomButtonPrimary onClick={redirectHandler}>
        {t("Register")}
      </CustomButtonPrimary>
    </CustomStackFullWidth>
  );
};

const CenterCards = ({ configData }) => {
  const text1 = t("Register as seller and open shop in");
  const text2 = t("to start your business");
  return (
    <CustomStackFullWidth
      direction={{ xs: "column", sm: "row" }}
      spacing={4}
      justifyContent="space-between"
      alignItems="stretch"
    >
      {configData?.toggle_dm_registration && (
        <Card
          headingText="Become A Seller"
          subtitleText={`${text1} ${configData?.business_name} ${text2}`}
          redirectLink={`${process.env.NEXT_PUBLIC_BASE_URL}/store/apply`}
        />
      )}

      {configData?.toggle_dm_registration && (
        <Card
          headingText="Become A Deliveryman"
          subtitleText={t("Register as delivery man and earn money")}
          redirectLink={`${process.env.NEXT_PUBLIC_BASE_URL}/deliveryman/apply`}
        />
      )}
    </CustomStackFullWidth>
  );
};
const Registration = ({ configData }) => {
  return (
    <CustomContainer>
      <CustomStackFullWidth py="3.125rem" spacing={5} height="100%">
        <TopText configData={configData} />
        <CenterCards configData={configData} />
      </CustomStackFullWidth>
    </CustomContainer>
  );
};

Registration.propTypes = {};

export default Registration;

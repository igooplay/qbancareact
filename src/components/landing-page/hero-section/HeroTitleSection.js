import React, { useEffect, useState } from "react";
import { CustomStackFullWidth } from "../../../styled-components/CustomStyles.style";

import {
  alpha,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { t } from "i18next";

import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { CustomButton } from "../ComponentOne";
import { getLanguage } from "../../../helper-functions/getLanguage";

const HeroTitleSection = ({ configData, landingPageData, handleOrderNow }) => {
  const theme = useTheme();
  const isXSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const currentLanguage = getLanguage();

  return (
    <CustomStackFullWidth
      spacing={{ xs: 2, md: 4 }}
      justifyContent="center"
      alignItems="center"
    >
      <CustomStackFullWidth spacing={0.5}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={0.5}
          flexWrap="wrap"
        >
          <Typography
            sx={{
              color: (theme) => theme.palette.neutral[1000],
              fontSize: "2.30rem",
              fontWeight: "bold",
            }}
          >
            {landingPageData?.hero_section?.hero_section_heading.slice(0, 4)}
          </Typography>
          <Typography
            color={theme.palette.primary.main}
            sx={{ fontSize: "2.50rem", fontWeight: "bold" }}
          >
            {landingPageData?.hero_section?.hero_section_heading.slice(
              4,
              landingPageData?.hero_section?.hero_section_heading.length
            )}
          </Typography>
        </Stack>
        <Typography
          color={alpha(theme.palette.primary.main, 0.8)}
          variant="h4"
          fontWeight="400"
        >
          {landingPageData?.hero_section?.hero_section_slogan}
        </Typography>
      </CustomStackFullWidth>
      <Typography
        variant="h1"
        sx={{ color: (theme) => theme.palette.primary.main }}
      >
        {configData?.business_name}
      </Typography>

      <CustomStackFullWidth spacing={2}>
        <Typography variant={isXSmall ? "subtitle2" : "h5"} fontWeight="500">
          {landingPageData?.hero_section?.hero_section_short_description}
        </Typography>

        <Stack width="100%" alignItems="center" justifyContent="center">
          <CustomButton
            variant="contained"
            onClick={() => handleOrderNow?.()}
            boxshadow="true"
          >
            <Stack direction="row" alignItems="center" spacing={0.4}>
              <Typography variant="h6" color="whiteContainer.main">
                {t("Order Now")}
              </Typography>
              <ArrowRightAltIcon
                sx={{ color: (theme) => theme.palette.whiteContainer.main }}
              />
            </Stack>
          </CustomButton>
        </Stack>
      </CustomStackFullWidth>
    </CustomStackFullWidth>
  );
};

export default HeroTitleSection;

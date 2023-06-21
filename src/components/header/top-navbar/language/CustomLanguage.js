import React, {useEffect, useRef, useState} from "react";
import {ListItemIcon, MenuItem, Stack, Typography} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import eng from "../../../../../public/landingpage/us.svg";
import portugues from "../../../../../public/landingpage/brasil-flag-svg.svg";
//import { CustomColouredTypography } from "../styled-components/CustomStyles.style";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-hot-toast";

import i18n, {t} from "i18next";
import {useTheme} from "@mui/material/styles";
import {StyledMenu, TopBarButton} from "../../NavBar.style";
import {useSettings} from "../../../../contexts/use-settings";
import {setCountryCode, setLanguage} from "../../../../redux/slices/configData";
import {haveRtlLanguages} from "./rtlLanguageList";
import {languageList} from "./languageList";


const getValues = (settings) => ({
    direction: settings.direction,
    responsiveFontSizes: settings.responsiveFontSizes,
    theme: settings.theme,
});

const CustomLanguage = ({formmobilemenu, language, countryCode}) => {
    const {configData} = useSelector((state) => state.configData);
    const theme = useTheme();
    // const [language, setLanguage] = useState("");
    const [anchorEl, setAnchorEl] = useState(null);
    const {settings, saveSettings} = useSettings();
    const [values, setValues] = useState(getValues(settings));
    const anchorRef = useRef(null);
    //const { configData } = useSelector((state) => state.configDataSettings);
    const dispatch = useDispatch()
    useEffect(() => {
        if (typeof window !== "undefined") {
            let languageSetting = JSON.parse(
                localStorage.getItem("language-setting")
            );
            localStorage.setItem(
                "language-setting",
                JSON.stringify(languageSetting || "br")
            );
        }
    }, []);

    useEffect(() => {
        if (typeof window !== "undefined") {
            let languageSetting = JSON.parse(
                localStorage.getItem("language-setting")
            );
            let country = JSON.parse(localStorage.getItem("country"));
            if (languageSetting) {
                dispatch(setCountryCode(country));
                dispatch(setLanguage(languageSetting));
                i18n.changeLanguage(languageSetting);
            }
        }
    }, [language]);

    const handleClick = (event) => {
        // i18n.changeLanguage(language)
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        settings && setValues(getValues(settings));
    }, [settings]);
    const open = Boolean(anchorEl);
    const isRTLLanguage = (value) => {
        return haveRtlLanguages.includes(value);
    };

    const handleChangeLanguage = (lan) => {
        i18n.changeLanguage(lan?.languageCode);
        dispatch(setLanguage(lan?.languageCode));
        dispatch(setCountryCode(lan?.countryCode));

        localStorage.setItem("language-setting", JSON.stringify(lan?.languageCode))
        localStorage.setItem("country", JSON.stringify(lan?.countryCode));

        handleClose?.();

        saveSettings({
            ...values,
            direction: isRTLLanguage(lan?.languageCode) ? "rtl" : "ltl",
        })
        setTimeout(() => {
            toast.success(t("Language has been changed."));
        }, 500);

    };

    return (
        <>
            <TopBarButton
                formmobilemenu={formmobilemenu}
                // id="demo-customized-button"
                variant="text"
                size="small"
                aria-controls={open ? "demo-customized-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                disableElevation
                onClick={handleClick}
                startIcon={
                    <Stack color={theme.palette.neutral[1000]}>
                        <img
                            width="20px"
                            src={language === "en" ? eng.src : portugues.src}
                        />
                    </Stack>
                }
                endIcon={
                    <Stack color={theme.palette.neutral[1000]}>
                        <KeyboardArrowDownIcon/>
                    </Stack>
                }
            >
                <Typography color={theme.palette.neutral[1000]}>
                    {language === "en" ? "English" : "Portugues"}
                </Typography>
            </TopBarButton>
            <StyledMenu
                disableScrollLock={true}
                id="demo-customized-menu"
                MenuListProps={{
                    "aria-labelledby": "demo-customized-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                {languageList?.map((lan, index) => (
                    <MenuItem
                        onClick={() => handleChangeLanguage(lan)}
                        disableRipple
                        key={index}
                        sx={{
                            "&:hover": {
                                backgroundColor: "primary.main",
                            },
                        }}
                    >
                        <ListItemIcon>
                            <img width="20px" src={lan?.countryFlag}/>
                        </ListItemIcon>
                        {lan.languageName}
                    </MenuItem>
                ))}
            </StyledMenu>
        </>
    );
};

CustomLanguage.propTypes = {};

export default CustomLanguage;

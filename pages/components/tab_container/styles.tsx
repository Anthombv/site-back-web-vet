import styled from "styled-components";
import theme from "../../../controllers/styles/theme";

export const NavStyler = styled.div`
  .nav-link{
    color: ${theme.colors.grey};
    cursor: pointer;
  }
  .active{
    color: red !important;
  }
`
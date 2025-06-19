import { Navigate, useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import styled from "styled-components";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

/* eslint-disable react/prop-types */
export default function ProtectedRoute({ children }) {
  const { isFetchingUser, isAuthenticated } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && !isFetchingUser) {
      console.log("Redirecting to login");
      navigate("/login");
    }
  }, [isAuthenticated, isFetchingUser, navigate]);

  if (isFetchingUser) {
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  }

  if (isAuthenticated) return children;
}

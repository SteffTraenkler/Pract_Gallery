import { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import './App.css';
import AuthRequired from "./Components/AuthRequired";
import { useProfileInfo } from "./hooks/useProfileInfo";
import AddImg from "./Pages/AddImg";
import DefaultPage from "./Pages/DefaultPage";
import Home from "./Pages/Home";
import Image from "./Pages/Image";
import Profile from "./Pages/Profile";
import EditProfile from "./Pages/ProfileEdit";
import TagsList from "./Pages/TagsList";

function AppRoutes() {

  const [token, setToken] = useState(null);

  const loginSuccess = (token) => {
    setToken(token);
  };

  const profileInfo = useProfileInfo(token);

  return (
    <Routes>
      <Route path="/" element={<DefaultPage loginSuccess={loginSuccess} token={token} setToken={setToken} profileInfo={profileInfo} />}>
        <Route index element={<Home />} />
        <Route path="image/:pictureId" element={<Image />} />
        <Route path="/add" element={
          <AuthRequired token={token} setToken={setToken}>
            <AddImg token={token} setToken={setToken} />
          </AuthRequired>
        } />

        <Route path="tag/:tag" element={<TagsList />} />

        <Route path="settings/editProfile/:userId" element={<EditProfile token={token} profileInfo={profileInfo} />} />
        <Route path="user/:userId" element={<Profile token={token} profileInfo={profileInfo} />} />
      </Route>
    </Routes>
  );
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}


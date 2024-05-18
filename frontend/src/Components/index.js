import Header from "./Header/Header";
import Home from "./Home/Home";
import Contact from "./Contact/Contact";

import Login from "./Auth/Login";
import SignUp from "./Auth/SignUp";
import ForgotPassword from "./Auth/ForgotPassword";

import Footer from "./Footer/Footer";

import { GetProfile } from "./Profile/GetProfile";
import UpdateProfile from "./Profile/UpdateProfile";

import Following_Posts from "./Posts/Following_Posts";
import AllPosts from "./Posts/All_Posts";
import ViewPost from "./Posts/ViewPost";
import CreatePost from "./Posts/CreatePost";
import EditPost from "./Posts/EditPost";
import PostCard from "./Posts/PostCard";
import ReplyCard from "./Posts/ReplyCard";

import { Error404 } from "./ErrorHandling/Error404";
import { Error500 } from "./ErrorHandling/Error500";

import { Success, Danger } from "./Auth/comps/Alerts";
import Loader from "./Loader";

import { GoBackButton,SubmitButton } from "./common";

export {
    Header, Home, Contact, Login, SignUp, Footer, ForgotPassword,
    UpdateProfile, GetProfile,
    AllPosts, Following_Posts, CreatePost, ViewPost, EditPost, PostCard, ReplyCard,
    Danger, Success, Error500, Error404, Loader ,
    GoBackButton , SubmitButton
};


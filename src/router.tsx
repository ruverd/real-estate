import { createBrowserRouter } from "react-router-dom";

import { AboutPage } from "@/pages/about";
import { ContactPage } from "@/pages/contact";
import { HomePage } from "@/pages/home";
import { NotFoundPage } from "@/pages/not-found";
import { PropertyDetailPage } from "@/pages/property-detail";
import { AppLayout } from "@/shared/layouts/app.layout";
import { SavedPropertiesPage } from "./pages/saved-properties";

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/contact",
        element: <ContactPage />,
      },
      {
        path: "property/:id",
        element: <PropertyDetailPage />,
      },
      {
        path: "/saved-properties",
        element: <SavedPropertiesPage />,
      },
    ],
  },
]);

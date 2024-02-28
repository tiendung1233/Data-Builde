import {
  Box,
  Card,
  Layout,
  Link,
  List,
  Page,
  Text,
  BlockStack,
  SkeletonPage,
  SkeletonBodyText,
  SkeletonDisplayText,
} from "@shopify/polaris";
import { useEffect } from "react";
import HeaderBar from "~/components/commons/header";
import DataReport from "~/layouts/export_app/report";
import { authenticate } from "../../app/shopify.server";
import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node";
import {
  ClientLoaderFunctionArgs,
  useActionData,
  useLoaderData,
} from "@remix-run/react";
import { syncDataProductFollowingCondition } from "~/ultils/api/syncDataProduct";
import { syncDataCustomerFollowingCondition } from "~/ultils/api/syncDataCustomer";
import { syncDataOrderrFollowingCondition } from "~/ultils/api/syncDataOrder";
import { syncDataInventoryFollowingCondition } from "~/ultils/api/syncDataInventory";

export const loader = async ({ request, params }: ClientLoaderFunctionArgs) => {
  const { admin, session } = await authenticate.admin(request);

  return null;
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const { admin, session } = await authenticate.admin(request);

  const formDataRequest = (await request.formData()) || "default";
  const tabId = formDataRequest?.get("idAction");

  const rawDataProduct = await syncDataProductFollowingCondition(
    tabId as string,
    admin,
  );
  const rawDataCus = await syncDataCustomerFollowingCondition(
    tabId as string,
    admin,
  );
  const rawDataOrder = await syncDataOrderrFollowingCondition(
    tabId as string,
    admin,
  );
  const rawDataInventory = await syncDataInventoryFollowingCondition(
    tabId as string,
    admin,
  );

  return json({
    products: rawDataProduct,
    customers: rawDataCus,
    orders: rawDataOrder,
    inventory: rawDataInventory,
  });
};

export default function DataReportPage() {
  // const { orders, products, customers } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();

  const tabs = [
    {
      id: "1",
      content: "Report",
      accessibilityLabel: "All customers",
      link: "all-customers-content-1",
      body: <DataReport />,
    },
    {
      id: "2",
      content: "Schedule",
      link: "accepts-marketing-content-1",
      body: <div></div>,
    },
    {
      id: "3",
      content: "Setting",
      link: "repeat-customers-content-1",
      body: <div></div>,
    },
    {
      id: "4",
      content: "HelpDocs",
      link: "prospects-content-1",
      body: <div></div>,
    },
  ];

  return (
    <>
      <Page>
        <ui-title-bar title="Data Report">
          <button
            variant="primary"
            onClick={() => {
              window.open("https://example.q/contact", "_blank");
            }}
          >
            Contact Us
          </button>
        </ui-title-bar>

        <HeaderBar tabs={tabs} />
      </Page>
    </>
  );
}

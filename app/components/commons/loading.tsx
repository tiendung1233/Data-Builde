import { Spinner } from "@shopify/polaris";

export default function Loading() {
  return (
    <div style={{ marginTop: "20px", display:'flex', justifyContent:'center' }}>
      <Spinner accessibilityLabel="Spinner example" size="large" />
    </div>
  );
}

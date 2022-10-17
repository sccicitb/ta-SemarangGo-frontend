import withUnProtectedPage from "@/components/hocs/withUnProctectedPage";
import { Button, Card, Form, Input, Layout } from "antd";
import { useAction } from "./_action";

function LoginPage() {
  const { onFinish, loading } = useAction();
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout.Content
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Card title="Login" style={{ maxWidth: 350, width: "100%" }}>
          <Form onFinish={onFinish}>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                shape="round"
                loading={loading}
                htmlType="submit"
                size="large"
                block
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Layout.Content>
    </Layout>
  );
}

export default withUnProtectedPage(LoginPage);

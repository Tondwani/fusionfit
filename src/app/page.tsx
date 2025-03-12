"use client"

import { Layout, Typography, Button, Tabs, Space } from "antd"
import { useRouter } from "next/navigation"

const { Header, Content, Footer } = Layout
const { Title, Paragraph, Text } = Typography

export default function Home() {
  const router = useRouter()

  const handleJoinNow = () => {
    router.push("/form")
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(135deg, #2d1b4e, #4a2899, #6b46c1)",
          color: "white",
        }}
      >
        <Header
          style={{
            background: "rgba(26, 16, 41, 0.9)",
            position: "fixed",
            width: "100%",
            zIndex: 10,
            padding: "15px 50px",
            boxShadow: "0 2px 15px rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "2px solid #8a63d2",
            height: "auto",
          }}
        >
          <Title
            level={2}
            style={{
              color: "white",
              margin: 0,
              fontSize: "28px",
              fontWeight: 800,
              letterSpacing: "2px",
              textShadow: "0 0 10px rgba(138, 99, 210, 0.7)",
            }}
          >
            FUSION GYM
          </Title>
          <Button
            type="primary"
            onClick={handleJoinNow}
            style={{
              background: "linear-gradient(90deg, #8A63D2, #6B46C1)",
              borderColor: "#6B46C1",
              height: "40px",
              padding: "0 20px",
              fontSize: "14px",
              fontWeight: 700,
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
            }}
          >
            JOIN NOW
          </Button>
        </Header>

        <Content
          style={{
            padding: "0 50px",
            marginTop: "80px",
            flex: 1,
          }}
        >
          <div
            style={{
              textAlign: "center",
              padding: "60px 0",
              background: "rgba(255, 255, 255, 0.1)",
              borderRadius: "12px",
              marginTop: "20px",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
            }}
          >
            <Title
              level={1}
              style={{
                color: "white",
                fontSize: "42px",
                fontWeight: 700,
                textShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
              }}
            >
              Why Join Us?
            </Title>
            <Paragraph
              style={{
                fontSize: "18px",
                maxWidth: "800px",
                margin: "20px auto 30px",
                color: "#e0d0ff",
                lineHeight: 1.6,
                padding: "0 20px",
              }}
            >
              Transform your life with state-of-the-art equipment, expert trainers, and a supportive community. At
              Fusion Gym, we&apos;re committed to helping you achieve your fitness goals.
            </Paragraph>
            <Button
              type="primary"
              size="large"
              onClick={handleJoinNow}
              style={{
                background: "linear-gradient(90deg, #8A63D2, #6B46C1)",
                borderColor: "#6B46C1",
                height: "54px",
                padding: "0 40px",
                fontSize: "18px",
                fontWeight: 700,
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
              }}
            >
              Join Now
            </Button>
          </div>

          <Tabs
            defaultActiveKey="1"
            items={[
              {
                key: "1",
                label: "",
                children: (
                  <div
                    style={{
                      padding: "40px 0",
                      maxWidth: "800px",
                      margin: "30px auto",
                      background: "rgba(26, 16, 41, 0.7)",
                      borderRadius: "12px",
                      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
                    }}
                  >
                    <Paragraph
                      style={{
                        fontSize: "18px",
                        lineHeight: 1.7,
                        color: "#e0d0ff",
                        padding: "0 30px",
                        textAlign: "center",
                      }}
                    >
                      Fusion Gym is more than just a fitness center - it&apos;s a community dedicated to helping you
                      become the best version of yourself. With our innovative approach to fitness and wellness, we
                      combine traditional training methods with modern techniques to create a unique and effective
                      workout experience.
                    </Paragraph>
                  </div>
                ),
              },
            ]}
            style={{
              marginTop: "30px",
              color: "white",
            }}
          />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "50px",
              margin: "30px 0 50px",
              background: "rgba(26, 16, 41, 0.8)",
              borderRadius: "12px",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
            }}
          >
            <div
              style={{
                flex: 1,
                padding: "30px",
                textAlign: "center",
                borderRadius: "8px",
                background: "rgba(74, 40, 153, 0.3)",
                margin: "0 15px",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
              }}
            >
              <div style={{ fontSize: "40px", marginBottom: "20px" }}>💪</div>
              <Title
                level={3}
                style={{
                  color: "white",
                  fontSize: "24px",
                  fontWeight: 700,
                  marginBottom: "15px",
                }}
              >
                STRENGTH
              </Title>
              <Paragraph style={{ color: "#e0d0ff" }}>
                Build power, increase muscle mass, and enhance your physical capabilities
              </Paragraph>
            </div>

            <div
              style={{
                flex: 1,
                padding: "30px",
                textAlign: "center",
                borderRadius: "8px",
                background: "rgba(74, 40, 153, 0.3)",
                margin: "0 15px",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
              }}
            >
              <div style={{ fontSize: "40px", marginBottom: "20px" }}>🔥</div>
              <Title
                level={3}
                style={{
                  color: "white",
                  fontSize: "24px",
                  fontWeight: 700,
                  marginBottom: "15px",
                }}
              >
                ENDURANCE
              </Title>
              <Paragraph style={{ color: "#e0d0ff" }}>
                Push beyond your limits with high-intensity cardio and conditioning
              </Paragraph>
            </div>
          </div>
        </Content>

        <Footer
          style={{
            background: "#1A1A1A",
            color: "white",
            textAlign: "center",
            padding: "40px 50px",
            borderTop: "5px solid #6B46C1",
          }}
        >
          <Space direction="vertical" align="center" size={15}>
            <Text style={{ color: "#ccc", fontSize: "16px" }}>
              © {new Date().getFullYear()} Fusion Gym. All rights Reserved
            </Text>
            <Text style={{ color: "#e0d0ff", fontSize: "18px", fontStyle: "italic", maxWidth: "600px" }}>
              &ldquo;Strength doesn&apos;t come from what you can do. It comes from overcoming the things you once
              thought you couldn&apos;t.&rdquo;
            </Text>
          </Space>
        </Footer>
      </div>
    </Layout>
  )
}


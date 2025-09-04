// src/components/TransactionSummary/TransactionSummary.tsx
import React from "react";
import { Card, Statistic, Avatar, Badge, Row, Col } from "antd";
import {
  SwapOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  BankOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { TransactionSummary as Summary } from "../../Models/Transaction";

interface TransactionSummaryProps {
  summary: Summary;
  loading?: boolean;
}

export const TransactionSummaryComponent: React.FC<TransactionSummaryProps> = ({
  summary,
  loading = false,
}) => {
  const summaryCards = [
    {
      title: "Tổng giá trị",
      value: summary.totalVolume,
      precision: 0,
      prefix: "₫",
      icon: <SwapOutlined className="text-blue-600" />,
      bgColor: "bg-blue-100",
      valueColor: "#1e40af",
    },
    {
      title: "Hoàn thành",
      value: summary.completedCount,
      precision: 0,
      icon: <CheckCircleOutlined className="text-green-600" />,
      bgColor: "bg-green-100",
      valueColor: "#059669",
    },
    {
      title: "Đang xử lý",
      value: summary.pendingCount,
      precision: 0,
      icon: <ClockCircleOutlined className="text-orange-500" />,
      bgColor: "bg-orange-100",
      valueColor: "#D97706",
      badge: summary.pendingCount > 0 ? summary.pendingCount : undefined,
    },
    {
      title: "Tổng phí",
      value: summary.totalFees,
      precision: 2,
      prefix: "₫",
      icon: <BankOutlined className="text-purple-600" />,
      bgColor: "bg-purple-100",
      valueColor: "#7c3aed",
    },
  ];

  // Thêm card thất bại nếu có
  if (summary.failedCount > 0) {
    summaryCards.splice(3, 0, {
      title: "Thất bại",
      value: summary.failedCount,
      precision: 0,
      icon: <ExclamationCircleOutlined className="text-red-600" />,
      bgColor: "bg-red-100",
      valueColor: "#dc2626",
    });
  }

  return (
    <Row gutter={[24, 24]} className="mb-8">
      {summaryCards.map((card, index) => (
        <Col xs={24} sm={12} lg={summary.failedCount > 0 ? 5 : 6} key={index}>
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="p-4 text-center">
              <div className="flex items-center justify-center mb-4">
                {card.badge !== undefined ? (
                  <Badge count={card.badge} offset={[8, -8]}>
                    <Avatar
                      size={56}
                      className={`${card.bgColor} border-2 border-white shadow-md`}
                      icon={card.icon}
                    />
                  </Badge>
                ) : (
                  <Avatar
                    size={56}
                    className={`${card.bgColor} border-2 border-white shadow-md`}
                    icon={card.icon}
                  />
                )}
              </div>

              <Statistic
                title={
                  <span className="text-gray-600 font-medium text-base">
                    {card.title}
                  </span>
                }
                value={card.value}
                precision={card.precision}
                prefix={card.prefix}
                loading={loading}
                valueStyle={{
                  fontSize: "28px",
                  fontWeight: "bold",
                  color: card.valueColor,
                  fontFamily: "Inter, system-ui, sans-serif",
                }}
              />

              {/* Thêm mô tả phụ cho một số cards */}
              {index === 0 && (
                <div className="mt-2 text-xs text-gray-500">
                  Tổng giá trị giao dịch
                </div>
              )}
              {index === 3 && summary.totalFees > 0 && (
                <div className="mt-2 text-xs text-gray-500">
                  Phí giao dịch & hoa hồng
                </div>
              )}
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

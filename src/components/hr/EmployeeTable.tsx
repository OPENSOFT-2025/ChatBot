
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const employees = [
  { id: 1, name: 'Alex Johnson', position: 'Senior Developer', flagged: false },
  { id: 2, name: 'Sarah Williams', position: 'Product Manager', flagged: true },
  { id: 3, name: 'Michael Chen', position: 'UI/UX Designer', flagged: false },
  { id: 4, name: 'Emily Davis', position: 'Marketing Specialist', flagged: false },
  { id: 5, name: 'Robert Taylor', position: 'System Analyst', flagged: true },
];

export function EmployeeTable() {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  return (
    <Card className="shadow-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-medium text-gray-800">Employee Status</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Position</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees.map((employee) => (
              <TableRow 
                key={employee.id}
                className="transition-colors duration-200"
                onMouseEnter={() => setHoveredRow(employee.id)}
                onMouseLeave={() => setHoveredRow(null)}
                style={{
                  backgroundColor: hoveredRow === employee.id ? 'rgba(14, 165, 233, 0.05)' : 'transparent'
                }}
              >
                <TableCell className="font-medium">{employee.id}</TableCell>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.position}</TableCell>
                <TableCell className="text-right">
                  <Badge 
                    variant={employee.flagged ? "destructive" : "outline"}
                    className={`
                      transition-all duration-200 
                      ${employee.flagged ? 'bg-orange-100 text-orange-600 hover:bg-orange-200' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'}
                    `}
                  >
                    {employee.flagged ? 'Flagged' : 'Unflagged'}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

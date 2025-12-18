import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { getCitesData } from "../data/cites/api";
import { ShieldAlert } from "lucide-react";

interface CitesCardProps {
  countryCode: string;
  countryName: string;
}

export function CitesCard({ countryCode, countryName }: CitesCardProps) {
  const citesData = getCitesData(countryCode);

  if (!citesData) {
    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShieldAlert className="h-5 w-5" />
            CITES Listed Species
          </CardTitle>
          <CardDescription>
            No CITES data available for {countryName}
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShieldAlert className="h-5 w-5" />
          CITES Listed Species
        </CardTitle>
        <CardDescription>
          Species from {countryName} listed under the Convention on International Trade in Endangered Species
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-blue-600">
              {citesData.totalSpecies}
            </span>
            <span className="text-sm text-gray-600">
              total species listed across all appendices
            </span>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Appendix</TableHead>
                <TableHead>Species Count</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {citesData.appendices.map((item) => (
                <TableRow key={item.appendix}>
                  <TableCell>
                    <Badge 
                      variant={
                        item.appendix === 'I' ? 'destructive' : 
                        item.appendix === 'II' ? 'default' : 
                        'secondary'
                      }
                      className="font-semibold"
                    >
                      Appendix {item.appendix}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-semibold">
                    {item.count} species
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {item.description}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="text-xs text-gray-500 pt-2">
            Last updated: {new Date(citesData.lastUpdated).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

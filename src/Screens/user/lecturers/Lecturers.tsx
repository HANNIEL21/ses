import { Button } from '@/components/ui/button'

import { ChevronLeft } from 'lucide-react'
import { DataTable } from './data-table'
import { columns, data } from './columns'

const LecturersList = () => {
    return (
        <main>
            <div>
                <Button variant="outline" size="icon"> <ChevronLeft /> </Button>
                
            </div>

            <div className="container mx-auto">
                <DataTable columns={columns} data={data} />
            </div>
        </main>
    )
}

export default LecturersList
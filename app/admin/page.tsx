'use client'

import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AdminNav from '@/components/admin/AdminNav'
import ImageManager from '@/components/admin/ImageManager'
import YoutubeManager from '@/components/admin/YoutubeManager'
import CourseInfoEditor from '@/components/admin/CourseInfoEditor'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('nail_menu')
  
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <AdminNav />
      
      <main className="flex-1 container mx-auto px-4 py-8 max-w-6xl">
        <h1 className="font-display text-3xl font-bold text-ink mb-6">Bảng điều khiển</h1>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-white border text-ink border-border-soft shadow-sm mb-8 w-full justify-start overflow-x-auto p-1 h-auto py-2">
            <TabsTrigger value="nail_menu" className="whitespace-nowrap rounded-md px-4 py-2 data-[state=active]:bg-rose data-[state=active]:text-white">💅 Mẫu Nail</TabsTrigger>
            <TabsTrigger value="brow_lamination" className="whitespace-nowrap rounded-md px-4 py-2 data-[state=active]:bg-amber-500 data-[state=active]:text-white">✨ Mẫu Chân Mày</TabsTrigger>
            <TabsTrigger value="lash_lift" className="whitespace-nowrap rounded-md px-4 py-2 data-[state=active]:bg-emerald-500 data-[state=active]:text-white">👁️ Mẫu Uốn Mi</TabsTrigger>
            <TabsTrigger value="student_work" className="whitespace-nowrap rounded-md px-4 py-2 data-[state=active]:bg-sky-500 data-[state=active]:text-white">🎓 Tác Phẩm Học Viên</TabsTrigger>
            <TabsTrigger value="classroom" className="whitespace-nowrap rounded-md px-4 py-2 data-[state=active]:bg-emerald-500 data-[state=active]:text-white">📸 Ảnh Lớp Học</TabsTrigger>
            <TabsTrigger value="youtube" className="whitespace-nowrap rounded-md px-4 py-2 data-[state=active]:bg-red-600 data-[state=active]:text-white">🎬 Video YouTube</TabsTrigger>
            <TabsTrigger value="course_info" className="whitespace-nowrap rounded-md px-4 py-2 data-[state=active]:bg-orange-500 data-[state=active]:text-white">ℹ️ Thông Tin Khóa Học</TabsTrigger>
          </TabsList>
          
          <TabsContent value="nail_menu" className="mt-0 outline-none">
             <ImageManager category="nail_menu" title="Quản lý Mẫu Nail" />
          </TabsContent>
          <TabsContent value="brow_lamination" className="mt-0 outline-none">
             <ImageManager category="brow_lamination" title="Quản lý Mẫu Chân Mày" />
          </TabsContent>
          <TabsContent value="lash_lift" className="mt-0 outline-none">
             <ImageManager category="lash_lift" title="Quản lý Mẫu Uốn Mi" />
          </TabsContent>
          <TabsContent value="student_work" className="mt-0 outline-none">
             <ImageManager category="student_work" title="Quản lý Tác Phẩm Học Viên" />
          </TabsContent>
          <TabsContent value="classroom" className="mt-0 outline-none">
             <ImageManager category="classroom" title="Quản lý Ảnh Lớp Học" />
          </TabsContent>
          <TabsContent value="youtube" className="mt-0 outline-none">
             <YoutubeManager />
          </TabsContent>
          <TabsContent value="course_info" className="mt-0 outline-none">
             <CourseInfoEditor />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

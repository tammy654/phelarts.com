@@ .. @@
       <section className="py-24 bg-gradient-to-br from-[#242424] via-gray-800 to-[#016952]">
-        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
+        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center" data-aos="fade-up">
           <h1 className="text-5xl lg:text-7xl font-bold text-[#fefefe] mb-8">
-            Our Portfolio
+            Our Work
           </h1>
           <p className="text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto mb-12">
             A showcase of our recent projects that demonstrate our commitment to 
             exceptional design and storytelling.
           </p>
-          <div className="flex flex-wrap justify-center gap-4">
+          <div className="flex flex-wrap justify-center gap-4" data-aos="fade-up" data-aos-delay="200">
             <div className="bg-[#fefefe]/10 backdrop-blur-sm border border-[#fefefe]/20 rounded-full px-4 py-2">
               <span className="text-sm font-medium text-[#fefefe]/90">500+ Projects Completed</span>
             </div>
@@ .. @@
       {/* Filter Section */}
       <section className="py-12 bg-[#fefefe] border-b border-gray-100">
-        <div className="max-w-7xl mx-auto px-6 lg:px-8">
+        <div className="max-w-7xl mx-auto px-6 lg:px-8" data-aos="fade-up">
           <div className="flex flex-wrap justify-center gap-4">
             {filters.map((filter) => (
               <button
@@ .. @@
       {/* Portfolio Grid */}
       <section className="py-24 bg-[#fefefe]">
         <div className="max-w-7xl mx-auto px-6 lg:px-8">
           <div className="grid lg:grid-cols-2 gap-16">
             {filteredProjects.map((project, index) => (
               <div
                 key={index}
                 className="group"
+                data-aos="fade-up"
+                data-aos-delay={index * 100}
               >
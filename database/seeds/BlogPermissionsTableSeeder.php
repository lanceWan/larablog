<?php
use Illuminate\Database\Seeder;
use App\Models\Permission;
class BlogPermissionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //////////
        //博客管理//
        //////////
        Permission::create([
            'name' => '博客管理',
            'slug' => 'system.blog',
            'description' => '博客管理'
        ]);
        /**
         * 文章列表
         */
        Permission::create([
            'name' => '文章列表',
            'slug' => 'article.list',
            'description' => '文章列表'
        ]);
        /**
         * 创建文章
         */
        Permission::create([
            'name' => '创建文章',
            'slug' => 'article.create',
            'description' => '创建文章'
        ]);
        /**
         * 删除文章
         */
        Permission::create([
            'name' => '删除文章',
            'slug' => 'article.destroy',
            'description' => '删除文章'
        ]);
        /**
         * 修改文章
         */
        Permission::create([
            'name' => '修改文章',
            'slug' => 'article.edit',
            'description' => '修改文章'
        ]);

        /**
         * 发布文章
         */
        Permission::create([
            'name' => '发布文章',
            'slug' => 'article.push',
            'description' => '发布文章'
        ]);

        /**
         * 草稿箱
         */
        Permission::create([
            'name' => '草稿箱',
            'slug' => 'article.audit',
            'description' => '草稿箱'
        ]);

        /**
         * 查看文章
         */
        Permission::create([
            'name' => '查看文章',
            'slug' => 'article.show',
            'description' => '查看文章'
        ]);


        /**
         * 分类列表
         */
        Permission::create([
            'name' => '分类列表',
            'slug' => 'category.list',
            'description' => '分类列表'
        ]);
        /**
         * 创建分类
         */
        Permission::create([
            'name' => '创建分类',
            'slug' => 'category.create',
            'description' => '创建分类'
        ]);
        /**
         * 删除分类
         */
        Permission::create([
            'name' => '删除分类',
            'slug' => 'category.destroy',
            'description' => '删除分类'
        ]);

        /**
         * 修改分类
         */
        Permission::create([
            'name' => '修改分类',
            'slug' => 'category.edit',
            'description' => '修改分类'
        ]);

        /**
         * 查看分类
         */
        Permission::create([
            'name' => '查看分类',
            'slug' => 'category.show',
            'description' => '查看分类'
        ]);


        /**
         * 标签列表
         */
        Permission::create([
            'name' => '标签列表',
            'slug' => 'tag.list',
            'description' => '标签列表'
        ]);
        /**
         * 创建标签
         */
        Permission::create([
            'name' => '创建标签',
            'slug' => 'tag.create',
            'description' => '创建标签'
        ]);
        /**
         * 删除标签
         */
        Permission::create([
            'name' => '删除标签',
            'slug' => 'tag.destroy',
            'description' => '删除标签'
        ]);
        
        /**
         * 修改标签
         */
        Permission::create([
            'name' => '修改标签',
            'slug' => 'tag.edit',
            'description' => '修改标签'
        ]);

        /**
         * 友情链接
         */
        Permission::create([
            'name' => '友情链接列表',
            'slug' => 'link.list',
            'description' => '友情链接列表'
        ]);
        /**
         * 添加友情链接
         */
        Permission::create([
            'name' => '添加友情链接',
            'slug' => 'link.create',
            'description' => '添加友情链接'
        ]);
        /**
         * 删除友情链接
         */
        Permission::create([
            'name' => '删除友情链接',
            'slug' => 'link.destroy',
            'description' => '删除友情链接'
        ]);
        
        /**
         * 修改友情链接
         */
        Permission::create([
            'name' => '修改友情链接',
            'slug' => 'link.edit',
            'description' => '修改友情链接'
        ]);

        /**
         * 博客配置列表
         */
        Permission::create([
            'name' => '博客配置列表',
            'slug' => 'blog.list',
            'description' => '博客配置列表'
        ]);

        /**
         * 博客配置修改
         */
        Permission::create([
            'name' => '博客配置修改',
            'slug' => 'blog.edit',
            'description' => '博客配置修改'
        ]);

        /**
         * 七牛图片管理
         */
        Permission::create([
            'name' => '七牛图片管理',
            'slug' => 'media.list',
            'description' => '七牛图片管理'
        ]);

        /**
         * 七牛图片管理
         */
        Permission::create([
            'name' => '七牛图片管理',
            'slug' => 'media.destroy',
            'description' => '七牛图片管理'
        ]);


    }
}

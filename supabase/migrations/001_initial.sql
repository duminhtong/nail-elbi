-- Images (catalogue + classroom)
CREATE TABLE images (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name          TEXT NOT NULL,
  category      TEXT NOT NULL CHECK (category IN (
                  'nail_menu',        -- Tab 1: customer nail designs
                  'student_work',     -- Tab 2: student nail work
                  'classroom'         -- Classroom photo gallery
                )),
  storage_path  TEXT NOT NULL,
  public_url    TEXT NOT NULL,
  batch         TEXT,                 -- for student_work: class batch number
  sort_order    INTEGER DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Counters for auto-naming
CREATE TABLE counters (
  key    TEXT PRIMARY KEY,
  value  INTEGER DEFAULT 0
);
INSERT INTO counters (key, value) VALUES
  ('nail_menu', 0),
  ('student_work', 0),
  ('classroom', 0);

-- YouTube videos (lessons + student interviews)
CREATE TABLE youtube_videos (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title         TEXT NOT NULL,
  description   TEXT,
  youtube_url   TEXT NOT NULL,
  youtube_id    TEXT NOT NULL,        -- extracted video ID for embed
  category      TEXT NOT NULL CHECK (category IN (
                  'free_lesson',      -- Free nail lessons page
                  'student_interview' -- Student interview page
                )),
  thumbnail_url TEXT,                 -- auto-generated from YouTube ID
  sort_order    INTEGER DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Course info (editable by admin — stored as structured JSON)
CREATE TABLE course_info (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section       TEXT NOT NULL UNIQUE CHECK (section IN (
                  'pricing',          -- Bảng giá học phí
                  'rules',            -- Quy định lớp học
                  'benefits'          -- Quyền lợi và nghĩa vụ
                )),
  content       JSONB NOT NULL,       -- flexible JSON content per section
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Seed default course info
INSERT INTO course_info (section, content) VALUES
('pricing', '{
  "title": "Bảng Giá Học Phí",
  "courses": [
    {"name": "Khóa Cơ Bản", "duration": "1 tháng", "price": "3.500.000", "note": "Phù hợp người mới bắt đầu"},
    {"name": "Khóa Nâng Cao", "duration": "2 tháng", "price": "6.500.000", "note": "Yêu cầu đã học cơ bản"},
    {"name": "Khóa Toàn Diện", "duration": "3 tháng", "price": "9.000.000", "note": "Từ cơ bản đến nâng cao"}
  ],
  "notes": ["Học phí đã bao gồm dụng cụ học tập", "Hỗ trợ trả góp 0%", "Học lại miễn phí nếu chưa đạt"]
}'),
('rules', '{
  "title": "Quy Định Lớp Học",
  "items": [
    "Học viên cần có mặt đúng giờ, thông báo trước nếu vắng mặt",
    "Giữ gìn vệ sinh dụng cụ và khu vực học tập",
    "Không chụp ảnh, quay phim trong giờ học khi chưa được phép",
    "Hoàn thành bài tập được giao trước buổi học tiếp theo",
    "Tôn trọng giáo viên và các học viên khác trong lớp"
  ]
}'),
('benefits', '{
  "title": "Quyền Lợi & Nghĩa Vụ Học Viên",
  "rights": [
    "Được cấp chứng chỉ nghề sau khi hoàn thành khóa học",
    "Hỗ trợ giới thiệu việc làm sau tốt nghiệp",
    "Được học lại miễn phí các buổi vắng có phép",
    "Tham gia nhóm cộng đồng học viên NAIL ELBI",
    "Nhận ưu đãi đặc biệt khi đăng ký khóa học nâng cao"
  ],
  "obligations": [
    "Đóng học phí đúng hạn theo thỏa thuận",
    "Bảo quản dụng cụ được cấp phát trong suốt khóa học",
    "Tham gia ít nhất 80% số buổi học để được cấp chứng chỉ",
    "Không chia sẻ tài liệu học độc quyền của NAIL ELBI ra bên ngoài"
  ]
}');

-- Row Level Security
ALTER TABLE images ENABLE ROW LEVEL SECURITY;
ALTER TABLE counters ENABLE ROW LEVEL SECURITY;
ALTER TABLE youtube_videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_info ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read images" ON images FOR SELECT USING (true);
CREATE POLICY "Public read youtube" ON youtube_videos FOR SELECT USING (true);
CREATE POLICY "Public read course_info" ON course_info FOR SELECT USING (true);

CREATE POLICY "Admin manage images" ON images FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin manage youtube" ON youtube_videos FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin manage course_info" ON course_info FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin manage counters" ON counters FOR ALL USING (auth.role() = 'authenticated');
